"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { H1Icon, H2Icon } from "@heroicons/react/24/outline";

const Tiptap = ({ Content, setContent }) => {
  const [ActiveOption, setActiveOption] = useState(null);
  const [previousImages, setPreviousImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[80vh] prose prose-lg sm:prose lg:prose-lg xl:prose-xl prose-h1:font-semibold prose-h1:font-robo prose-h3:font-robo prose-h3:mt-2 prose-p:font-robo mx-auto focus:outline-none",
      },
    },
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "Your Story...",
      }),
    ],
    onUpdate: async ({ editor }) => {
      setContent(editor.getJSON());
      const newImages = editor.getJSON().content?.filter(item => item.type === "image").map(item => item.attrs.src) || [];
      const deletedImages = previousImages.filter(url => !newImages.includes(url));
      
      for (const url of deletedImages) {
        // console.log("Deleting image from storage:", url);
        await fetch(`/api/upload/delete?url=${encodeURIComponent(url)}`, {
          method: "DELETE",
        });
      }
      
      setPreviousImages(newImages);
      setCurrentImages(newImages);
    },
  });

  useEffect(() => {
    if (editor && Content) {
      editor.commands.setContent(Content);
    }
  }, [editor, Content]);

  const addImage = useCallback(() => {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Optionally restrict to image files
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        // console.log(file);
        const response = await fetch(`/api/upload/post?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const newBlob = await response.json();
        const url = newBlob.url;
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      }
    };
    input.click();
  }, [editor]);

  if (!editor) {
    return null; // Return early if editor is not initialized
  }

  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-full">
        {editor && (<div >
          <BubbleMenu  editor={editor} tippyOptions={{ duration: 500 }} updateDelay={{duration:1000}} >
            <div  className="bubble-menu flex gap-2">
              <div >
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "is-active" : ""}
                >
                  Bold
                </button>
              </div>
              <div>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "is-active" : ""}
                >
                  Italic
                </button>
              </div>
              <div>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "is-active" : ""}
                >
                  Strike
                </button>
              </div>
            </div>
          </BubbleMenu></div>
        )}
        {editor && (
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="floating-menu translate-y-10 border w-fit rounded-xl px-2 backdrop-blur-xl py-2 mt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  setActiveOption(ActiveOption === "Heading" ? "" : "Heading");
                }}
                className="font-bold font-slab"
              >
                Heading
              </button>

              <button
                onClick={() => {
                  setActiveOption(ActiveOption === "List" ? "" : "List");
                }}
                className="font-bold font-slab"
              >
                List
              </button>

              <button onClick={addImage} className="font-bold font-slab">
                Image
              </button>
            </div>
            {ActiveOption === "Heading" && (
              <div className="absolute mt-12 border rounded-xl py-2 px-2 w-full  flex gap-2">
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
                >
                  <H1Icon className="h-[20px] w-[20px]" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
                >
                  <H2Icon className="h-[20px] w-[20px]" />
                </button>
              </div>
            )}
            {ActiveOption === "List" && (
              <div className="absolute mt-12 border rounded-xl py-2  w-full  flex justify-between px-4">
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive("bulletList") ? "is-active font-semibold" : ""}
                >
                  Bullet list
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={editor.isActive("orderedList") ? "is-active font-semibold" : ""}
                >
                  Ordered list
                </button>
              </div>
            )}
          </FloatingMenu>
        )}
        <div className="sm:w-[50vw]  p-[2vw] w-full rounded-xl">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
