import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
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
    <div style={{ margin: "30px" }}>
      <Head>
        <title>Home | Next-Blog</title>
      </Head>
      <h1>JSON</h1>
      <button onClick={onClick}>Add Post</button>
      <p>{JSON.stringify(posting)}</p>
      <h1>My Post</h1>
      <PostingList posting={posting} />
    </div>
  );
}
