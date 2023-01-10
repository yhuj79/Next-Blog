import Head from "next/head";
import { useRouter } from "next/router";
import Spinner from "../../../src/components/Spinner";
import PostGrid from "../../../src/components/PostGrid";
import prisma from "../../../hooks/prisma";

export default function PostContents({ postContents, title, email }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Head>
          <title>{`${title} | ${email}`}</title>
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
  const email = params.email;
  const postContents = JSON.parse(JSON.stringify(post));

  return {
    props: { postContents, title, email },
  };
}
