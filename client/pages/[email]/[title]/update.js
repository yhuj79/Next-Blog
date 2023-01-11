import Head from "next/head";
import { useRouter } from "next/router";
import Quill from "../../../src/components/Quill";
import prisma from "../../../hooks/prisma";

export default function Update({ existingContents }) {
  const router = useRouter();
  const { id, email, title } = router.query;

  async function handler(body) {
    try {
      await fetch(`/api/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push(`/${email}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>{`Post Update | ${email}`}</title>
      </Head>
      <Quill handler={handler} existingContents={existingContents} />
    </div>
  );
}

export async function getStaticPaths() {
  const user = await prisma.user.findMany();
  return {
    paths: user.map((m) => ({
      params: {
        email: m.email,
        title: m.email,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const post = await prisma.post.findMany({
    where: {
      author: { email: `${params.email}@gmail.com` },
      title: params.title,
    },
  });
  const existingContents = JSON.parse(JSON.stringify(post));

  return {
    props: { existingContents },
  };
}
