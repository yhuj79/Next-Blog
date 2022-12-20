import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { TextArea, Button } from "semantic-ui-react";
import PostingList from "../src/components/PostingList";

export default function Home() {
  const [posting, setPosting] = useState([]);

  useEffect(() => {
    Axios.get("/api/read").then((res) => {
      setPosting(res.data);
      console.log("read : ", res.data);
    });
  }, []);

  // TEST /api/account
  useEffect(() => {
    Axios.get("/api/account").then((res) => {
      console.log("account : ", JSON.stringify(res.data, null, 5));
    });
  }, []);

  async function onClick() {
    await Axios.post("/api/post");
    window.location.reload();
  }

  return (
    <div style={{ margin: 30, display: "flex" }}>
      <Head>
        <title>Home | Next-Blog</title>
      </Head>
      <div>
        <h1>JSON</h1>
        <TextArea
          value={JSON.stringify(posting, null, 5)}
          rows={50}
          cols={50}
        />
      </div>
      <div style={{ marginLeft: 30 }}>
        <Button onClick={onClick}>Add Post</Button>
        {posting ? (
          <PostingList posting={posting} />
        ) : (
          <h1>로그인이 필요합니다.</h1>
        )}
      </div>
    </div>
  );
}
