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
    <main className="h-screen">
        <Landing />
    </main>
  );
}
