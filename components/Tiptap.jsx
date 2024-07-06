"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
const Tiptap = ({Content,setContent}) => {

  //main editor
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[80vh]  prose prose-sm sm:prose lg:prose-lg xl:prose-xl  prose-h1:font-semibold prose-h1:font-robo prose-h3:font-robo prose-h3:mt-2 prose-p:font-robo  mx-auto focus:outline-none",
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
      // The content has changed.
      setContent(editor.getJSON());
    },
    // content: `
    //   <h1>Heading</h1>
    // `,
  });
  //Image
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
 
  Content&&editor.commands.setContent(Content);

  



  return (
    <div className="h-full flex justify-center">
      <div>
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
            <div className="floating-menu border rounded-xl px-2 backdrop-blur-sm  py-2 mt-2 flex gap-4">
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`${
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                } border px-2 rounded-lg`}
              >
                H1
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
              >
                H3
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "is-active" : ""}
              >
                Bullet list
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "is-active" : ""}
              >
                Toggle ordered list
              </button>
              <button onClick={addImage}>Set image</button>
            </div>
          </FloatingMenu>
        )}
        <div className="w-[50vw]  p-[2vw]  rounded-xl">
          <div>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
