import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextArea, Button } from "semantic-ui-react";
import PostList from "../src/components/PostList";

export default function Home() {
  const router = useRouter();
  const [post, setPost] = useState([]);

  useEffect(() => {
    Axios.get("/api/read").then((res) => {
      setPost(res.data);
      console.log("read : ", res.data);
    });
  }, []);

  async function onClick() {
    await Axios.post("/api/post");
    window.location.reload("/");
  }

  return (
    <div style={{ margin: 30, display: "flex" }}>
      <Head>
        <title>Home | Next-Blog</title>
      </Head>
      <div>
        <h1>JSON</h1>
        <TextArea
          value={JSON.stringify(post, null, 5)}
          rows={50}
          cols={35}
        />
      </div>
      <div style={{ marginLeft: 30 }}>
        <Button onClick={() => router.push("/write")}>Add Post</Button>
        <Button onClick={onClick}>TEST</Button>
        {post ? (
          <PostList post={post} />
        ) : (
          <h1>로그인이 필요합니다.</h1>
        )}
      </div>
    </div>
  );
}
