import { storage } from "../../hooks/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button, Input, Segment, Card, Icon } from "semantic-ui-react";
import styles from "../../styles/Quill.module.css";
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
  const [loadThumb, setLoadThumb] = useState(false);

  const [thumbnail, setThumbnail] = useState("/images/empty.png");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

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
    setLoadThumb(true);

    try {
      const storageRef = ref(
        storage,
        `user/${sliceEmail}/thumbnail/${Date.now()}`
      );
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setThumbnail(url);
          setLoadThumb(false);
        });
      });
    } catch (error) {
      setLoadThumb(false);
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
            editor.setSelection(range.index + 1);
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
    <Segment>
      <div className={styles.input_div}>
        <div className={styles.input_div_three}>
          <Input
            className={styles.input}
            label={"ㅤ제목ㅤ"}
            placeholder="제목을 입력하세요"
            size="huge"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            className={styles.input}
            label={"ㅤ부제ㅤ"}
            placeholder="부제를 입력하세요"
            size="huge"
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Input
            className={styles.input}
            label={"카테고리"}
            placeholder="카테고리를 입력하세요"
            size="huge"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className={styles.thumbnail_wrap}>
          <Card className={styles.thumbnail_div}>
            {loadThumb ? (
              <div className={styles.thumbnail_load_div}>
                <Icon
                  name="spinner"
                  className={styles.thumbnail_load_spinner}
                  loading
                />
              </div>
            ) : (
              <img className={styles.thumbnail} src={thumbnail} />
            )}
            <Card.Content style={{ textAlign: "center" }}>
              <Button size="mini">
                <label htmlFor="input-file">썸네일 업로드</label>
              </Button>
              <input
                id="input-file"
                type="file"
                onChange={(e) => thumbnailHandler(e)}
                accept="image/*"
                style={{ display: "none" }}
              />
              {thumbnail != "/images/empty.png" && (
                <Icon
                  name="trash alternate"
                  onClick={() => setThumbnail("/images/empty.png")}
                  bordered
                />
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
      <div className={styles.quill_div}>
        <ReactQuill
          className={styles.quill}
          style={loadQuill ? { opacity: 0.2 } : {}}
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
      <div className={styles.button}>
        {!loading ? (
          <Button size="massive" onClick={onClick}>
            저장하기
          </Button>
        ) : (
          <Button size="massive" loading>
            저장하기
          </Button>
        )}
      </div>
    </Segment>
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
