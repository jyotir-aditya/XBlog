import React, { useState } from 'react'

const Button = ({content,onClick,size}) => {
  const [isDisbled, setisDisbled] = useState(false)
  const handleClick =()=>{
    setisDisbled(true);
    console.log("clicked..")
    onClick();
  }
  return (
    <div>
        <button disabled={isDisbled} onClick={handleClick}>
                <div className={`border-[2px] border-black hover:text-white relative text-black  px-4 sm:px-[1.5vw] ${size === "small"?"text-base sm:text-base py-[0.5vw]":"text-lg sm:text-[1.5vw] py-[1vw]"} font-robo  rounded-full overflow-hidden after:h-[100%] after:w-[100%] after:bg-black after:absolute after:left-0 after:bottom-[-100%] after:rounded-[50%] after:transition-all transition-all after:ease-in ease-in after:duration-300 duration-300 hover:after:bottom-0 hover:after:rounded-none `}>
                  <div className="z-10 relative ">{content}</div>
                </div>
              </button>
    </div>
  )
}

export default Button