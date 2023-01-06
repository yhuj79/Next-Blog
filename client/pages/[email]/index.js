import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button, Divider } from "semantic-ui-react";
import PostList from "../../src/components/PostList";

export default function PostAll() {
  const router = useRouter();
  const { email } = router.query;
  const { data: session, status } = useSession();

  const [post, setPost] = useState([]);

  useEffect(() => {
    Axios.get(`/api/check/${email}`).then((res) => {
      console.log("/api/check/[email]", res.data);
    });
  }, [router]);

  useEffect(() => {
    Axios.get(`/api/read/${email}`).then((res) => {
      setPost(res.data);
      console.log("/api/read/[email]", res.data);
    });
  }, [router]);

  return (
    <div>
      <Head>
        <title>{email} | Next-Blog</title>
      </Head>
      {post.length > 0 ? (
        <PostList post={post} />
      ) : (
        <h1>Post가 존재하지 않습니다.</h1>
      )}
    </div>
  );
}
