import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Quill from "../../../src/components/Quill";
import prisma from "../../../hooks/prisma";

export default function Edit({ existingContents }) {
  const router = useRouter();
  const { id, email, title } = router.query;

  const [loading, setLoading] = useState(false);

  async function handler(body) {
    setLoading(true);
    await fetch(`/api/post/edit/${id}`, {
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
        <title>{`글 수정 | ${email}`}</title>
      </Head>
      <Quill handler={handler} loading={loading} existingContents={existingContents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const post = await prisma.post.findMany({
    where: {
      email: `${context.params.email}@gmail.com`,
      title: context.params.title,
    },
  });
  const existingContents = JSON.parse(JSON.stringify(post));

  return {
    props: { existingContents },
  };
}
