import { Roboto_Condensed ,Roboto_Slab,Roboto } from "next/font/google";
import "./globals.css";
import SessionWraper from "@/components/SessionWraper";
import LandingNavbar from "@/components/LandingNavbar";
import { getServerSession } from "next-auth/next";
import MainNavbar from "@/components/MainNavbar";
import logo from "../public/Images/icon.png";
import TabBar from "@/components/TabBar";

const roboto=Roboto({
  subsets:["latin"],
  weight:'400',
  variable:'--font-robo'
})
const roboto_condensed = Roboto_Condensed({
  subsets: ['latin'],
  weight:'variable',
  variable:'--font-robo_condensed',
})
const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  weight:"variable",
  variable:'--font-robo_slab',
})

export const metadata = {
  title: 'XBlog',
  description: 'Here you can share your thoughts.',
  keywords: ["XBlog", "Blog", "Share", "Write"],
  

}

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  if(session){
    return (
    <SessionWraper>
      <html lang="en">
        <body className={`${roboto_slab.variable} ${roboto_condensed.variable} ${roboto.variable} `}>
          <MainNavbar/>
          {children}
          <div className="block sm:hidden">
          <TabBar/>
          </div>
          </body>
      </html>
    </SessionWraper>
  );
  }
  return (
    <SessionWraper>
      <html lang="en">
        <body className={`${roboto_slab.variable} ${roboto_condensed.variable} ${roboto.variable}`}>
          
          <LandingNavbar/>
          {children}
          </body>
      </html>
    </SessionWraper>)
  
  
}
