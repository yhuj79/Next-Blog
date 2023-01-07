import Head from "next/head";
import { useRouter } from "next/router";
import PostGrid from "../../../src/components/PostGrid";
import prisma from "../../../lib/prisma";

export default function PostContents({ postContents, title }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Head>
          <title>{title} | Next-Blog</title>
        </Head>
        <PostGrid postContents={postContents} />
      </div>
    );
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { email: "user1", title: "title1" } },
      { params: { email: "user2", title: "title2" } },
    ],
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
  const title = params.title;
  const postContents = JSON.parse(JSON.stringify(post));

  return {
    props: { postContents, title },
  };
}
