import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import PostingList from "../src/components/PostingList";

export default function Home() {
  const [posting, setPosting] = useState([]);

  useEffect(() => {
    Axios.get("/api/read").then((res) => {
      setPosting(res.data);
      console.log(res.data);
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
