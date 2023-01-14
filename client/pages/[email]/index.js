import Head from "next/head";
import { useRouter } from "next/router";
import Spinner from "../../src/components/Spinner";
import PostList from "../../src/components/PostList";
import prisma from "../../hooks/prisma";

export default function PostAll({ postAll, email }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Head>
          <title>{`${email} | Next-Blog`}</title>
        </Head>
        <PostList postAll={postAll} email={email} />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const post = await prisma.post.findMany({
    where: {
      email: `${context.params.email}@gmail.com`,
    },
  });

  if (post.length > 0) {
    const email = context.params.email;
    const postAll = JSON.parse(JSON.stringify(post));
    return {
      props: { postAll, email },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
