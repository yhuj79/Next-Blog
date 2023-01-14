import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button, Input, Divider } from "semantic-ui-react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Quill({ handler, loading, existingContents }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  if (existingContents) {
    useEffect(() => {
      setTitle(existingContents[0].title);
      setCategory(existingContents[0].category);
      setDesc(existingContents[0].desc);
      setContent(existingContents[0].content);
    }, [existingContents]);
  }

  function onClick() {
    const body = { email, title, category, desc, content };
    handler(body);
  }

  return (
    <div>
      <Divider />
      {!loading ? (
        <Button onClick={onClick}>저장하기</Button>
      ) : (
        <Button loading>저장하기</Button>
      )}
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
      <Input
        focus
        placeholder="Desc"
        defaultValue={desc}
        onChange={(e) => setDesc(e.target.value)}
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
