import React from "react";

const layout = ({modal, children}) => {
  return (
    <div className="">
      <div>{modal}</div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
