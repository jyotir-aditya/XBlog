"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Tiptap from "../Tiptap";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function Page() {
  const [data, setData] = useState();
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [Content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/query/allcategory");
      const result = await response.json();
      setCategories(
        result.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    }

    fetchCategories();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    if (session) {
      const formData = new FormData(event.target);
      formData.append("userId", session.user.id);
      formData.append("category", selectedCategory?.value);
      formData.append("content", JSON.stringify(Content));
      formData.append("title", title); 

      const response = await fetch("/api/query/newpost", {
        method: "POST",
        body: formData,
      });
      const res = await response.status;
      setData(res);
      console.log(res);
    } else {
      console.log("session not found");
    }
  }
  function test(){
    event.preventDefault();
    console.log(Content);
    console.log(title);
  }
  //fix late rendering,improve input sturucture of description,use content in post ,edit data in pgadmin
  return (
    <div className="min-h-[100vh] h-fit w-full flex justify-center items-center">
      <div className="mt-[10vh]">
        {/* <div className="text-[2vw] flex justify-center bg-fuchsia-200 mb-4 font-robo font-medium"><h1>Enter Details</h1></div> */}
        <div className="Form w-full h-full max-w-[60vw] min-w-[50vw] bg-white shadow-md rounded-xl  mb-[2vh] p-[2vw]">
            <div className={`${isVisible ? "block" : "hidden"} flex flex-col `}>
              <div className="flex flex-col ml-2">
                <input
                  className="text-[3vw] font-bold font-robo rounded-md  px-4 py-2 outline-none"
                  placeholder="Heading"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  // onKeyDown={(e)=>{e.key=="Enter"&& console.log(e.key)}}
                  required
                />
              </div>
              <Tiptap setContent={setContent} />
              <div className="flex justify-center">
                <div
                  className="border-[2px] px-5 py-2 rounded-full cursor-pointer text-[1.2vw] font-robo shadow-sm"
                  onClick={() => setIsVisible(false)}
                >
                  Next
                </div>
              </div>
            </div>
          <form onSubmit={onSubmit} className="">
            <div
              className={`${
                isVisible ? "hidden" : "block"
              } h-fit gap-4 space-y-6`}
            >
              <div className="flex flex-col">
                <input
                  className="text-[1.3vw] rounded-md  px-4 py-2 outline-none"
                  autoComplete="off"
                  placeholder="Image URL"
                  type="text"
                  name="picture"
                  required
                />
              </div>
              <div className="flex flex-col">
                <textarea
                  className="text-[1.3vw] rounded-md  px-4 py-2 outline-none"
                  rows={3}
                  placeholder="Description (30-40 words)"
                  name="description"
                  required
                />
              </div>
              <div className="flex flex-col">
                <input
                  className="text-[1.3vw] rounded-md  px-4 py-2 outline-none"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Tags (separated by comma)"
                  type="text"
                  name="tags"
                  required
                />
              </div>
              <div className="flex flex-col">
                <Select
                  className="text-[1.3vw] rounded-md px-4 py-2 outline-none"
                  options={categories}
                  onChange={setSelectedCategory}
                  placeholder="Select or type to search a category"
                  isClearable
                />
              </div>

              <div className="Button flex gap-4 justify-center">
                <div
                  className="border-[2px] px-5 py-2 rounded-full cursor-pointer text-[1.2vw] font-robo shadow-sm"
                  onClick={() => setIsVisible(true)}
                >
                  Back
                </div>
                <button
                  className="border-[2px] w-fit px-5 py-2 rounded-full cursor-pointer text-[1.2vw] font-robo shadow-sm bg-blue-500 text-white hover:bg-blue-700"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
          {data && (
            <div className="mt-4 text-green-600 text-[1.5vw]">
              Response Status: {data}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
