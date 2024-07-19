"use client"
import React, { useEffect } from 'react';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

const ContentTiptap =({content}) => {
    const editor = useEditor({
        content: {
          type: "doc",
          content: [
            // …
          ],
        },
        extensions: [
          StarterKit,
          Image.configure({
            HTMLAttributes: {
              class: "sm:h-96 h-60 ml-auto mr-auto ",
            },
          }),
        ],
        editorProps: {
          attributes: {
            class:
              "prose prose-md sm:prose lg:prose-lg xl:prose-xl  prose-h1:font-semibold prose-h1:font-serif prose-h2:mb-6 prose-h2:mt-2  mx-auto focus:outline-none",
          },
        },
        editable: false,
      });
      
      useEffect(() => {
        if (editor && content) {
          editor.commands.setContent(JSON.parse(content));
        }
      }, [editor, content]);
      

  return (
    <div><EditorContent editor={editor}/></div>
  )
}

export default ContentTiptap