import React from 'react'
import PayButton from './PayButton'
const MembersipCard = ({name,price,features}) => {
  return (
    <div>
        <div className="w-[25vw] h-fit bg-[#FDF9F9] border-2 border-black rounded-lg">
            <div className="CardInnerStructure w-full p-8">
              <h1 className="text-2xl font-medium font-robo">{name}</h1>
              <div className="flex items-baseline">
                <div className="text-3xl font-robo font-semibold">₹ {price}</div>
                <div className="text-lg font-robo">/ month</div>
              </div>
              <div>Billed monthly</div>
              <div className=" mt-4 flex flex-col gap-4">
                {features.map((value, index) => (
                  <div key={index} className="font-medium font-robo flex gap-2">
                    <div>✓</div>{value}
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center mt-4 gap-4"><PayButton /></div>
            </div>
          </div>
    </div>
  )
}

export default MembersipCard