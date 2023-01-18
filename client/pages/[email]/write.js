import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Quill from "../../src/components/Quill";

export default function Write() {
  const router = useRouter();
  const { email } = router.query;

  const [loading, setLoading] = useState(false);

  async function handler(body) {
    setLoading(true);
    await fetch("/api/post/postWrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.status === 200) {
        router.push(`/${email}/${encodeURI(body.title)}`);
      } else {
        setLoading(false);
      }
    });
  }

  return (
    <div>
      <Head>
        <title>{`새 글 작성 | ${email}`}</title>
      </Head>
      <Quill handler={handler} loading={loading} />
    </div>
  );
}
