import Head from "next/head";
import { useRouter } from "next/router";
import prisma from "../../../lib/prisma";
import { sortDate } from "../../../utils/sortDate";
import Spinner from "../../../src/components/Spinner";
import PostList from "../../../src/components/PostList";
import EmptySpace from "../../../src/components/EmptySpace";
import Category from "../../../src/components/Category";
import { Segment } from "semantic-ui-react";

export default function PageCategory({ postAll, filteredAll, email }) {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div>
      <Head>
        <title>{`${email} | Next-Blog`}</title>
      </Head>
      {filteredAll.length > 0 && (
        <>
          <Category postAll={postAll} email={email} act={category} />
          {filteredAll.map((m) => (
            <PostList
              key={m.id}
              id={m.id}
              email={email}
              title={m.title}
              thumbnail={m.thumbnail}
              category={m.category}
              desc={m.desc}
              createdAt={m.createdAt}
            />
          ))}
        </>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const post = await prisma.post.findMany();
  return {
    paths: post.map((m) => ({
      params: {
        email: m.email,
        category: m.category,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const user = await prisma.user.findMany({
    where: {
      email: `${params.email}@gmail.com`,
    },
  });

  const post = await prisma.post.findMany({
    where: {
      email: `${params.email}@gmail.com`,
    },
  });

  const filtered = await prisma.post.findMany({
    where: {
      email: `${params.email}@gmail.com`,
      category: params.category,
    },
  });

  if (user.length > 0) {
    const email = params.email;
    const postAll = sortDate(JSON.parse(JSON.stringify(post)));
    const filteredAll = sortDate(JSON.parse(JSON.stringify(filtered)));
    return {
      props: { postAll, filteredAll, email },
      revalidate: 1,
    };
  } else {
    return {
      notFound: true,
    };
  }
}
