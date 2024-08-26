import Footer from '@/components/subComponents/Footer'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        {children}
        <div className='mb-[10vh]'>
        <Footer/></div>
    </div>
  )
}

export default layout