import Link from "next/link";
import { getServerSession } from "next-auth/next";
import Landing from "@/components/Landing";
import Homepage from "@/components/Homepage";



export default async function Home() {
  const session = await getServerSession();

  if (session) {
  
    return (
      <main>
        <Homepage />
      </main>
    );
  }

  return (
    <main>
      <div>
        <Landing />
        Not signed in <br />
        {/* <button onClick={() => signIn()}>Sign in</button> */}
      </div>
    </main>
  );
}
