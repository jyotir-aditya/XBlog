import React, { useState } from 'react'

const Dropdown = () => {
    const menu=["Profile","My Posts"];
   
  return (
    <div><div className=' w-fit rounded-md translate-y-[-5px] shadow-lg  bg-fuchsia-100'>
        {menu.map((item,index)=>{return <div key={index} className='pr-[10vw] pl-[1vw] py-[1vh]'><ul>{item}</ul></div>})}
        
        </div></div>
  )
}

export default Dropdown;