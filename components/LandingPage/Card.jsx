import React from "react";
import Button from "./Button";

const Card = ({ heading, content, buttonTitle, buttonOnclick }) => {
  return (
    <div>
      <div className="Card h-[50vh] w-[80vw] sm:h-[20rem] sm:w-[20rem] border-2 flex flex-col justify-between items-center border-black p-4 rounded-2xl">
        <div className="flex flex-col gap-2 items-center justify-between">
          <p className="font-robo tracking-tight w-fit text-center font-medium text-2xl">
            {heading}
          </p>
          <p className="font-robo mt-2 text-center">{content}</p>
        </div>
        <div className="h-fit w-fit">
        <Button content={buttonTitle} onClick={buttonOnclick} size={"small"} /></div>
      </div>
    </div>
  );
};

export default Card;
