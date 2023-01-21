import Head from "next/head";
import { useRouter } from "next/router";
import Spinner from "../../../src/components/Spinner";
import PostGrid from "../../../src/components/PostGrid";
import prisma from "../../../hooks/prisma";

export default function PostContents({ postContents, title }) {
  const router = useRouter();
  // console.log(postContents);
  if (router.isFallback) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Head>
          <title>{`${title}`}</title>
        </Head>
        <PostGrid postContents={postContents} />
      </div>
    );
  }
}

export async function getStaticPaths() {
  const user = await prisma.user.findMany();
  return {
    paths: user.map((m) => ({
      params: {
        email: m.email,
        title: m.name,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await prisma.post.findMany({
    where: {
      email: `${params.email}@gmail.com`,
      title: params.title,
    },
  });

  if (post.length > 0) {
    const title = params.title;
    const postContents = JSON.parse(JSON.stringify(post));
    return {
      props: { postContents, title },
      revalidate: 1,
    };
  } else {
    return {
      notFound: true,
    };
  }
}
