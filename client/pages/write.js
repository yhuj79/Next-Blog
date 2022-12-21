import React, { useState } from "react";
import Axios from "axios";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button, Input, Divider } from "semantic-ui-react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Write() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  function handle() {
    console.log("title : ", title);
    console.log("category : ", category);
    console.log("content : ", content);
  }

  async function onClickPost() {
    const body = { title, category, content };
    await Axios.post("/api/post", JSON.stringify(body), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
    window.location.reload("/");
  }

  return (
    <div>
      <Divider />
      <Button onClick={handle}>Value</Button>
      <Button onClick={onClickPost}>Post</Button>
      <Divider />
      <Input
        focus
        placeholder="Title"
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        focus
        placeholder="Category"
        defaultValue={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <ReactQuill
        placeholder="Content"
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

const toolbarOptions = [
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];
const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};
