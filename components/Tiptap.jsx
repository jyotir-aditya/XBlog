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

  function validateImageType(file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    return allowedTypes.includes(file.type);
  }

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[80vh] prose prose-lg sm:prose lg:prose-lg xl:prose-xl prose-h1:font-semibold prose-h1:font-robo prose-h3:font-robo prose-h3:mt-2 prose-p:font-robo  mx-auto focus:outline-none",
      },
    },
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "sm:h-96 h-60  ml-auto mr-auto ",
        },
      }),
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
      const { selection } = editor.state;

  if (!selection.empty) {
    // Do not scroll into view when we're doing a mass update (e.g. underlining text)
    // We only want the scrolling to happen during actual user input
    return;
  }

  const viewportCoords = editor.view.coordsAtPos(selection.from);
  const absoluteOffset = window.scrollY + viewportCoords.top;

  window.scrollTo(
    window.scrollX,
    absoluteOffset - (window.innerHeight / 2),
  );
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
    const maxSizeInBytes = 1048576;
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file && !validateImageType(file)) {
        alert("Invalid file type. Please upload an image.");
        input.value = null; // Clear the input value
        return;
      }
      if (file && file.size > maxSizeInBytes) {
        alert("File too large. Maximum allowed size is 1MB.");
        input.value = null; // Clear the input value
        return;
      }
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
    <div className="h-fit  w-full flex justify-center">
      <div className="w-full">
        {editor && (<div >
          <BubbleMenu  editor={editor} tippyOptions={{ duration: 500 }} updateDelay={{duration:1000}} >
            <div  className="bubble-menu  border w-fit rounded-xl px-2 backdrop-blur-xl py-2  flex items-center gap-4">
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
            <div className="floating-menu mt-[70px] border w-fit rounded-xl px-2 backdrop-blur-xl py-2  flex items-center gap-4">
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
              <div className="absolute sm:mt-2 mt-0 border bg-white rounded-xl py-2 px-2 w-full  flex gap-2">
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
              <div className="absolute sm:mt-2 mt-0 bg-white border rounded-xl py-2  w-full  flex justify-between px-4">
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
