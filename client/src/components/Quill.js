import { storage } from "../../hooks/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button, Input, Divider, Image } from "semantic-ui-react";
import styles from "./Quill.module.css";
import Spinner from "./Spinner";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

export default function Quill({ handler, loading, existingContents }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const sliceEmail = email?.slice(0, 9);
  const quillRef = useRef();
  const [loadQuill, setLoadQuill] = useState(false);

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  function testValue() {
    console.log("title : ", title);
    console.log("thumbnail : ", thumbnail);
    console.log("category : ", category);
    console.log("desc : ", desc);
    console.log("content : ", content);
  }

  if (existingContents) {
    useEffect(() => {
      setTitle(existingContents[0].title);
      setThumbnail(existingContents[0].thumbnail);
      setCategory(existingContents[0].category);
      setDesc(existingContents[0].desc);
      setContent(existingContents[0].content);
    }, [existingContents]);
  }

  async function thumbnailHandler(e) {
    const file = e.target.files[0];

    try {
      const storageRef = ref(
        storage,
        `user/${sliceEmail}/thumbnail/${Date.now()}`
      );
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setThumbnail(url);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      setLoadQuill(true);

      try {
        const storageRef = ref(
          storage,
          `user/${sliceEmail}/contents/${Date.now()}`
        );
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            editor.insertEmbed(range.index, "image", url);
            setLoadQuill(false);
          });
        });
      } catch (error) {
        setLoadQuill(false);
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  function onClick() {
    const body = { email, title, thumbnail, category, desc, content };
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
      <Button onClick={testValue}>Value</Button>
      <Button>
        <label htmlFor="input-file">Thumbnail Upload</label>
      </Button>
      <input
        id="input-file"
        type="file"
        onChange={(e) => thumbnailHandler(e)}
        style={{ display: "none" }}
      />
      <Image
        src={thumbnail ? thumbnail : "/images/imageEmpty.png"}
        size="small"
      />
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
      <Divider />
      <div className={styles.quill_div}>
        <ReactQuill
          className={styles.quill}
          placeholder="Content"
          theme="snow"
          forwardedRef={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
        {loadQuill && (
          <div className={styles.loader}>
            <Spinner />
          </div>
        )}
      </div>
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
