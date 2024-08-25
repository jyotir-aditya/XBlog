import React from "react";
import Button from "./Button";

const Card = ({ heading, content, buttonTitle, buttonOnclick }) => {
  return (
    <div>
      <div className="Card h-[20vw] w-[20vw] border-2 flex flex-col justify-between items-center border-black p-4 rounded-2xl">
        <div className="flex flex-col gap-2 items-center">
          <p className="font-robo tracking-tight w-fit text-center font-medium text-2xl">
            {heading}
          </p>
          <p className="font-robo mt-2 text-center">{content}</p>
        </div>
        <Button content={buttonTitle} onClick={buttonOnclick} size={"small"} />
      </div>
    </div>
  );
};

export default Card;
