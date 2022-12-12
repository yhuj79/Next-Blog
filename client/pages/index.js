import Head from "next/head";
import Axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [posting, setPosting] = useState({});

  function getData() {
    Axios.get("/api/read").then((res) => {
      setPosting(res.data);
      console.log(res.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  async function onPostClick() {
    await Axios.post("/api/post");
    window.location.reload();
  }

  function goAbout() {
    router.push("/about");
  }

  return (
    <div>
      <Head>
        <title>Home | client</title>
      </Head>
      <h1>Client</h1>
      <button onClick={onPostClick}>Add</button>
      <button onClick={goAbout}>About</button>
      <p>{JSON.stringify(posting)}</p>
    </div>
  );
}
