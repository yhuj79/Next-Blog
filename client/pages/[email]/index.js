import Head from "next/head";
import { useRouter } from "next/router";
import Spinner from "../../src/components/Spinner";
import PostList from "../../src/components/PostList";
import prisma from "../../hooks/prisma";
import EmptySpace from "../../src/components/EmptySpace";
import { Segment } from "semantic-ui-react";
import Category from "../../src/components/Category";

export default function PostAll({ postAll, email }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{`${email} | Next-Blog`}</title>
      </Head>
      {postAll.length > 0 ? (
        <>
          <Category postAll={postAll} email={email} act={"All"} />
          {postAll.map((m) => (
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
      ) : (
        <Segment style={{ marginBottom: "14px" }}>
          <div>
            <EmptySpace router={router} email={email} type={"글"} />
          </div>
        </Segment>
      )}
    </div>
  );
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

  function sortDate(list) {
    const sorted_list = list
      .sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reverse();
    return sorted_list;
  }

  if (user.length > 0) {
    const email = context.params.email;
    const postAll = sortDate(JSON.parse(JSON.stringify(post)));
    return {
      props: { postAll, email },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
