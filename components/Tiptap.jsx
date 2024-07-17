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
    onUpdate({ editor }) {
      setContent(editor.getJSON());
    },
  });

  // Load content when the editor is ready and content changes
  useEffect(() => {
    if (editor && Content) {
      editor.commands.setContent(Content);
    }
  }, [editor, Content]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
  // add blockquetoe
  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-full">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="bubble-menu">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
              >
                Bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
              >
                Italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
              >
                Strike
              </button>
            </div>
          </BubbleMenu>
        )}
        {editor && (
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="floating-menu translate-y-10 border w-fit rounded-xl px-2 backdrop-blur-xl py-2 mt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  if (ActiveOption === "Heading") {
                    setActiveOption("");
                  } else {
                    setActiveOption("Heading");
                  }
                }}
                className="font-bold font-slab"
              >
                Heading
              </button>

              <button
                onClick={() => {
                  if (ActiveOption === "List") {
                    setActiveOption("");
                  } else {
                    setActiveOption("List");
                  }
                }}
                className="font-bold font-slab"
              >
                List
              </button>

              <button onClick={addImage} className="font-bold font-slab">
                Set image
              </button>
            </div>
            {ActiveOption === "Heading" && (
              <div className="absolute mt-12 border rounded-xl py-2 px-2 w-full  flex gap-2">
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                  }  px-2 rounded-lg`}
                >
                  <H1Icon className="h-[20px] w-[20px]" />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                  }
                >
                  <H2Icon className="h-[20px] w-[20px]" />
                </button>
              </div>
            )}
            {ActiveOption === "List" && (
              <div className="absolute mt-12 border rounded-xl py-2  w-full  flex justify-between px-4">
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={editor.isActive("bulletList") ? "is-active " : "font-semibold"}
                >
                  Bullet list
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={editor.isActive("orderedList") ? "is-active" : "font-semibold"}
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
