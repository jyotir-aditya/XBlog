import React from "react";
import PriamaryButton from "./subComponents/PriamaryButton";

const Newpost = () => {
  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const content = formData.get("content")
    console.log(title,content);
    // const response = await fetch("/api/submit", {
    //   method: "POST",
    //   body: formData,
    // });

    // Handle response if necessary
    // const data = await response.json();
    // ...
  }

  return (
    <div className="w-[50vw] px-[5vw] py-[5vh] border-black">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-[4vh]">
          <input
            className="h-[5vh] outline-none bg-white text-[3rem] "
            type="text"
            placeholder="Title"
            name="title"
          />

          <textarea
            className="h-[80vh] outline-none bg-white text-[1.8rem] align-text-top line-height-10" 
            type="text"
            placeholder="Content"
            name="content"
          />

          <div>
            <PriamaryButton text="Sumbit" type="sumbit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Newpost;
