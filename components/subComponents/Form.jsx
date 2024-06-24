"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Select from 'react-select';

export default function Page() {
  const [data, setData] = useState();
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/query/allcategory');
      const result = await response.json();
      setCategories(result.map(category => ({
        value: category.id,
        label: category.name
      })));
    }

    fetchCategories();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    if (session) {
      const formData = new FormData(event.target);
      formData.append('userId', session.user.id);
      formData.append('category', selectedCategory?.value);

      const response = await fetch('/api/query/newpost', {
        method: 'POST',
        body: formData,
      });
      const res = await response.status;
      setData(res);
      console.log(res);
    } else {
      console.log("session not found");
    }
  }

  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-gray-200">
      <div className="Form w-full max-w-[50vw] bg-white shadow-md rounded-xl p-[2vw]">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className={`${isVisible ? 'block' : 'hidden'} flex flex-col gap-6`}>
            <div className="flex flex-col">
              <input
                className="text-[1.5vw] rounded-md shadow-md px-4 py-2 outline-none"
                placeholder="Title"
                type="text"
                name="title"
                required
              />
            </div>
            <div className="flex flex-col">
              <input
                className="text-[1.3vw] rounded-md shadow-md px-4 py-2 outline-none"
                autoComplete="off"
                placeholder="Image URL"
                type="text"
                name="picture"
                required
              />
            </div>
            <div className="flex flex-col">
              <textarea
                className="text-[1.3vw] rounded-md shadow-md px-4 py-2 outline-none"
                rows={3}
                placeholder="Description (30-40 words)"
                name="description"
                required
              />
            </div>
            <div className="flex flex-col">
              <input
                className="text-[1.3vw] rounded-md shadow-md px-4 py-2 outline-none"
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
                className="text-[1.3vw] rounded-md shadow-md px-4 py-2 outline-none"
                options={categories}
                onChange={setSelectedCategory}
                placeholder="Select or type to search a category"
                isClearable
              />
            </div>
            <div className="flex justify-center">
              <div
                className="border-[2px] px-5 py-2 rounded-full cursor-pointer text-[1.2vw] font-robo shadow-sm"
                onClick={() => setIsVisible(false)}
              >
                Next
              </div>
            </div>
          </div>
          <div className={`${isVisible ? 'hidden' : 'block'} flex flex-col gap-4`}>
            <div className="flex flex-col">
              <textarea
                className="text-[1.5vw] outline-none p-2 rounded-lg"
                placeholder="Your story..."
                rows={12}
                name="content"
                required
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
        {data && <div className="mt-4 text-green-600 text-[1.5vw]">Response Status: {data}</div>}
      </div>
    </div>
  );
}
