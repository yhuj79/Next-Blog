import Head from "next/head";
import { useRouter } from "next/router";
import Spinner from "../../src/components/Spinner";
import PostList from "../../src/components/PostList";
import prisma from "../../hooks/prisma";

export default function PostAll({ postAll, email }) {
  const router = useRouter();
  console.log(postAll);
  if (router.isFallback) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Head>
          <title>{`${email} | Next-Blog`}</title>
        </Head>
        {postAll.length > 0 ? (
          <PostList postAll={postAll} email={email} />
        ) : (
          <div>
            <h1>아직 등록된 글이 없습니다.</h1>
          </div>
        )}
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const user = await prisma.user.findMany({
    where: {
      email: `${context.params.email}@gmail.com`,
    },
  });

  const post = await prisma.post.findMany({
    where: {
      email: `${context.params.email}@gmail.com`,
    },
  });

  if (user.length > 0) {
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
