import Footer from '@/components/subComponents/Footer'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        {children}
        <Footer/>
    </div>
  )
}

export default layout