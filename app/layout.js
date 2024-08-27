import { Roboto_Condensed ,Roboto_Slab,Roboto } from "next/font/google";
import "./globals.css";
import SessionWraper from "@/components/SessionWraper";
import LandingNavbar from "@/components/LandingNavbar";
import { getServerSession } from "next-auth/next";
import MainNavbar from "@/components/MainNavbar";
import logo from "../public/Images/icon.png";
import TabBar from "@/components/TabBar";
import Script from 'next/script';

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
  title: { default: 'XBlog', template: "%s - XBlog" },
  description: 'XBlog is a vibrant community where you can share your thoughts, explore diverse topics, and connect with like-minded individuals. Whether you want to read insightful content, write your own blog posts, or engage in meaningful discussions, XBlog offers a platform for your voice to be heard.',
  keywords: ["XBlog", "Blogging Platform", "Share Your Voice", "Write and Publish", "Community of Writers", "Inspiration", "Creative Writing"],
  openGraph: {
    title: 'XBlog - Connecting Minds, Sharing Stories',
    description: 'Join XBlog to share your thoughts, explore diverse topics, and connect with a community of passionate writers and readers.',
    url: 'https://www.xblog.co.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XBlog - Connecting Minds, Sharing Stories',
    description: 'Share your thoughts, explore diverse topics, and connect with a community of passionate writers and readers on XBlog.',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': '-1',
    'max-image-preview': 'large',
    'max-video-preview': '-1',
  },
};


export default async function RootLayout({ children }) {
  const session = await getServerSession();
  if(session){
    return (
    <SessionWraper>
      <html lang="en">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </head>
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
