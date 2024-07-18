"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Tiptap from "../Tiptap";
import { useRouter } from "next/navigation";
import { CloudIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function Page() {
  const [data, setData] = useState();
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [Content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputFileRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  

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

  function validateImageURL(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
  function validateImageType(file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif","image/webp"];
    return allowedTypes.includes(file.type);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setData();
    const maxSizeInBytes = 1048576; // 1MB
    if (session) {
      setLoading(true);
      setErrorMessage(""); // Reset error message

     //for tiptap
    
      const file = inputFileRef.current.files[0];
      console.log(file);
      //type check
      if (file && !validateImageType(file)) {
        alert("Invalid file type. Please upload an image.");
        inputFileRef.current.value = null; // Clear the input value
        setFileName(null); // Reset the fileName state
        setLoading(false);
        return;
      }
      //seze check
      if (file && file.size > maxSizeInBytes) {
        alert("File too large. Maximum allowed size is 1MB.");
        inputFileRef.current.value = null; // Clear the input value
        setFileName(null); // Reset the fileName state
        setLoading(false);
        return;
      }
      const response = await fetch(`/api/upload/post?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      const newBlob = await response.json();
      // console.log(newBlob);

      validateImageURL(newBlob.url);


      const formData = new FormData(event.target);
      formData.append("userId", session.user.id);
      formData.append("category", selectedCategory?.value);
      formData.append("content", JSON.stringify(Content));
      formData.append("title", title);
      formData.append("picture", newBlob.url);

      try {
        const response = await fetch("/api/query/newpost", {
          method: "POST",
          body: formData,
        });
        const res = await response.status;
        setData(res);
        console.log(res);
        if (res === 200) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error submitting post:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("session not found");
    }
  }
  const handleClick = () => {
    inputFileRef.current.click();
  };
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const handleRemove = () => {
    inputFileRef.current.value = null; // Clear the input value
    setFileName(null); // Reset the fileName state
  };

  return (
    <div className="min-h-[100vh] h-fit w-full flex justify-center items-center">
      <div className="mt-[10vh]">
        <div className="Form w-[90vw] sm:w-full h-full sm:max-w-[60vw] sm:min-w-[50vw] bg-white shadow-md rounded-xl sm:mb-[2vh] mb-[50px] p-[2vw]">
          <div className={`${isVisible ? "block" : "hidden"} flex flex-col`}>
            <div className="flex flex-col ml-2">
              <input
                className="sm:text-[3vw] text-3xl font-bold font-robo rounded-md sm:px-4 py-2 outline-none"
                placeholder="Heading"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <Tiptap setContent={setContent} />
            <div className="flex justify-center">
              <div
                className="border-[2px] px-5 py-2 rounded-full cursor-pointer sm:text-[1.2vw] font-robo shadow-sm"
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
              <div className="flex flex-col"></div>
              <div className="flex flex-col">
                <textarea
                  className="sm:text-[1.3vw] hover:bg-slate-50 rounded-md px-4 py-2 outline-none"
                  rows={3}
                  placeholder="Description (30-40 words)"
                  name="description"
                  required
                />
              </div>
              <div className="flex flex-col">
                <input
                  className="sm:text-[1.3vw] hover:bg-slate-50 rounded-md px-4 py-2 outline-none"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Tags (separated by comma)"
                  type="text"
                  name="tags"
                  required
                />
              </div>
              {/* Input design */}
              <div className="Input">
                {fileName === null && (
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={handleClick}
                      className="flex items-center w-full sm:text-[1.3vw] px-4 py-2 bg-white text-gray-400 rounded-md  hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:ring-opacity-50"
                    >
                      <CloudIcon className="w-5 h-5 mr-2 sm:w-[1.5rem] sm:h-[1.5rem]" />
                      Upload Image
                    </button>
                  </div>
                )}
                {fileName && (
                  <div className="flex items-center justify-between sm:text-[1.3vw]  px-4 py-2 w-full text-black">
                    <div className=" flex items-center">
                      <PhotoIcon className="w-5 h-5 sm:w-[1.5rem] sm:h-[1.5rem] mr-2" />
                      {fileName}
                    </div>
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="flex items-center justify-center px-2 py-2 z-10   text-black rounded-md  hover:text-red-600 focus:outline-none "
                    >
                      <TrashIcon className="w-5 h-5 sm:w-[1.5rem] sm:h-[1.5rem] " />
                    </button>
                  </div>
                )}

                {/* Input */}
                <input
                  className="sm:text-[1.3vw] text-gray-400 font-robo hidden rounded-md px-4 py-2 outline-none"
                  name="file"
                  ref={inputFileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  // autoComplete="off"
                  // placeholder="Image URL"
                  // type="text"
                  // name="picture"
                  // value={imageURL}
                  // onChange={(e) => setImageURL(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Select
                  className="sm:text-[1.3vw] rounded-md px-4 py-2 outline-none"
                  options={categories}
                  onChange={setSelectedCategory}
                  placeholder="Select or type to search a category"
                  isClearable
                />
              </div>

              <div className="Button flex gap-4 justify-center">
                <div
                  className="border-[2px] px-5 py-2 rounded-full cursor-pointer sm:text-[1.2vw] font-robo shadow-sm"
                  onClick={() => setIsVisible(true)}
                >
                  Back
                </div>
                <button
                  className={`border-[2px] w-fit px-5 py-2 rounded-full cursor-pointer sm:text-[1.2vw] font-robo shadow-sm ${
                    loading
                      ? "bg-gray-400"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </form>
          {/* {blob && <div className="mt-6">{blob.url}</div>} */}
          {errorMessage && (
            <div className="mt-4 text-red-600 text-[1.5vw]">{errorMessage}</div>
          )}
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
