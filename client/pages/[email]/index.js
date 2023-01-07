import Head from "next/head";
import { useRouter } from "next/router";
import PostList from "../../src/components/PostList";
import prisma from "../../lib/prisma";

export default function PostAll({ postAll, email }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  } else
    return (
      <div>
        <Head>
          <title>{email} | Next-Blog</title>
        </Head>
        <PostList postAll={postAll} email={email} />
      </div>
    );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { email: "user1" } }, { params: { email: "user2" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const post = await prisma.post.findMany({
    where: {
      author: { email: `${params.email}@gmail.com` },
    },
    include: {
      author: {
        select: { email: true },
      },
    },
  });
  const email = params.email;
  const postAll = JSON.parse(JSON.stringify(post));

  return {
    props: { postAll, email },
  };
}
