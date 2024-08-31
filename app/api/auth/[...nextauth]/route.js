import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import PostgresAdapter from "@auth/pg-adapter";
import { db } from "@vercel/postgres";

// const db = new Pool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   port: 5432,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

const reservedUrls = ["legal","api","get_premium","newpost","post","posts","search","settings"]; // Add more reserved URLs as needed

const generateUniqueUsername = async (baseUsername) => {
  const client = await db.connect();
  try {
    let username = baseUsername;
    let usernameExists = true;
    let counter = 1;

    // Check if the username exists or is a reserved URL
    while (usernameExists || reservedUrls.includes(username.toLowerCase())) {
      const res = await client.query(
        "SELECT EXISTS(SELECT 1 FROM xusers WHERE username = $1)",
        [username]
      );
      usernameExists = res.rows[0].exists;

      if (usernameExists || reservedUrls.includes(username.toLowerCase())) {
        username = `${baseUsername}${counter}`;
        counter++;
      }
    }

    return username;
  } finally {
    client.release();
  }
};

const auth = NextAuth({
  adapter: PostgresAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session }) {
      const client = await db.connect();
      try {
        const res = await client.query(
          "SELECT * FROM xusers WHERE email = $1",
          [session.user.email]
        );
        session.user.id = res.rows[0].id.toString();
        session.user.username = res.rows[0].username.toString();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        client.release();
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      const client = await db.connect();
      try {
        const userExists = await client.query(
          "SELECT EXISTS(SELECT 1 FROM xusers WHERE email = $1)",
          [user.email]
        );

        if (!userExists.rows[0].exists) {
          const name = user.name;
          let username = user.email.substring(0, user.email.indexOf("@"));
          const email = user.email;
          const bio = "This is your bio you can personalize it.";
          const image = user.image;

          // Ensure username is unique and not a reserved URL
          username = await generateUniqueUsername(username);

          await client.query(
            "INSERT INTO xusers (name, username, email, bio, image) VALUES ($1, $2, $3, $4, $5)",
            [name, username, email, bio, image]
          );
        }
        return true;
      } catch (error) {
        console.error(
          "Error checking if user exists or inserting user:",
          error
        );
        return false;
      } finally {
        client.release();
      }
    },
  },
});

export { auth as GET, auth as POST };
