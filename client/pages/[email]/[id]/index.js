import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PostId() {
  const router = useRouter();
  const { email, id } = router.query;

  useEffect(() => {
    Axios.get(
      `/api/read/post/${id}`,
      { params: { id: Number(id) } }
    ).then((res) => {
      console.log(res.data);
    });
  }, [id]);

  return (
    <div>
      <Head>
        <title>{id} | Next-Blog</title>
      </Head>
      <h1>ID : {id}</h1>
    </div>
  );
}
