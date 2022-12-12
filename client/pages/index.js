import Axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [posting, setPosting] = useState({});

  useEffect(() => {
    Axios.get("/api/read").then((res) => {
      setPosting(res.data);
      console.log(res.data);
    });
  }, [posting]);

  async function onClick() {
    await Axios.post("/api/post");
  }

  return (
    <div style={{ margin: "30px" }}>
      <h1>Posting</h1>
      <button onClick={onClick}>Add Post</button>
      <p>{JSON.stringify(posting)}</p>
    </div>
  );
}
