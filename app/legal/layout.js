import Footer from '@/components/subComponents/Footer'
import React from 'react'
import { getServerSession } from "next-auth/next";

const layout = async ({children}) => {
  const session = await getServerSession();
  return (
    <div>
        {children}
        <div className={`${session ? "mb-[10vh]":"mb-0" }`}>
        <Footer/>
        </div>
    </div>
  )
}

export default layout