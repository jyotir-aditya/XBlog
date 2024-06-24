import Link from "next/link";
import React from "react";

const PriamaryButton = ( props ) => {
  return (<button onClick={props.onClick} type={props.type}>
    <div className="border-[2px] rounded-full border-black flex justify-center items-center w-[120px] h-[5.5vh] font-semibold text-[18px]">
      {props.text}
    </div></button>
  );
};

export default PriamaryButton;
