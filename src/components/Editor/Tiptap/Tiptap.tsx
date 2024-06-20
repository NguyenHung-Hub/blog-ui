"use client";
import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  Editor,
  EditorContent,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React, { useEffect, useState } from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlock from "./CodeBlock";
import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import ModalUploadTiptap from "./ModalUploadTiptap";

lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("javascript", javascript);

const MenuBar = ({ editor }: { editor: Editor }) => {
  const [modalUpload, setModalUpload] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url != "") {
      // editor
      //   .chain()
      //   .focus()
      //   .setImage({ src: url, alt: "image", title: "title image" })
      //   .run();
      editor
        .chain()
        .focus()
        .insertContent(
          `<img class='mx-auto my-2' src='${url}' alt='image' style='width:600px;height:400px;' />`,
        )
        .run();
      setUrl("");
    }
  }, [url]);

  if (!editor) {
    return null;
  }

  return (
    <div className="h-28 bg-white px-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`btn-menu-editor ${
          editor.isActive("bold") ? "bg-gray-300" : ""
        }`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`btn-menu-editor ${
          editor.isActive("italic") ? "bg-gray-300" : ""
        }`}
      >
        italic
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`btn-menu-editor ${
          editor.isActive("strike") ? "bg-gray-300" : ""
        }`}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`btn-menu-editor ${
          editor.isActive("code") ? "bg-gray-300" : ""
        }`}
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="btn-menu-editor"
      >
        clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="btn-menu-editor"
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`btn-menu-editor ${
          editor.isActive("paragraph") ? "bg-gray-300" : ""
        }`}
      >
        paragraph
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn-menu-editor ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-300 leading-snug"
            : ""
        }`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn-menu-editor ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
        }`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`btn-menu-editor ${
          editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""
        }`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`btn-menu-editor ${
          editor.isActive("heading", { level: 4 }) ? "bg-gray-300" : ""
        }`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`btn-menu-editor ${
          editor.isActive("heading", { level: 5 }) ? "bg-gray-300" : ""
        }`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`btn-menu-editor ${
          editor.isActive("heading", { level: 6 }) ? "bg-gray-300" : ""
        }`}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btn-menu-editor ${
          editor.isActive("bulletList") ? "bg-gray-300" : ""
        }`}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`btn-menu-editor ${
          editor.isActive("orderedList") ? "bg-gray-300" : ""
        }`}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`btn-menu-editor ${
          editor.isActive("codeBlock") ? "bg-gray-300" : ""
        }`}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`btn-menu-editor ${
          editor.isActive("blockquote") ? "bg-gray-300" : ""
        }`}
      >
        blockquote
      </button>

      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="btn-menu-editor"
      >
        horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="btn-menu-editor"
      >
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="btn-menu-editor"
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="btn-menu-editor"
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={`btn-menu-editor ${
          editor.isActive("textStyle", { color: "#958DF1" })
            ? "bg-gray-300"
            : ""
        }`}
      >
        purple
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("").run()}
        className={`btn-menu-editor ${
          editor.isActive("textStyle", { color: "" }) ? "bg-gray-300" : ""
        }`}
      >
        none
      </button>
      <button
        onClick={() => setModalUpload(true)}
        className={`btn-menu-editor`}
      >
        image
      </button>
      <ModalUploadTiptap
        showModal={modalUpload}
        setShowModal={setModalUpload}
        setURL={setUrl}
      />
    </div>
  );
};

export interface TipTipProps {
  content: string;
  className?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const TipTapEditor = (props: TipTipProps) => {
  const { content } = props;

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      Image,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        codeBlock: false,
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({ lowlight }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      props.setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content) {
      setTimeout(() => {
        console.log(`file: Tiptap.tsx:289 > content:`, content);
        editor.commands.setContent(content, false);
        console.log("set content");
      }, 100);
    }
  }, [editor, content]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);
  return (
    <div className="relative h-full overflow-hidden">
      {editor && <MenuBar editor={editor} />}

      <div className="editor-content-wrapper overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
