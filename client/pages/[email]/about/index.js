import Head from "next/head";
import { useRouter } from "next/router";
import Spinner from "../../../src/components/Spinner";
import { Segment, Divider, Button, Header } from "semantic-ui-react";
import DOMPurify from "isomorphic-dompurify";
import { useSession } from "next-auth/react";
import prisma from "../../../hooks/prisma";

export default function About({ user, email }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  if (!user) {
    return <Spinner />;
  } else {
    return (
      <Segment>
        <Head>
          <title>{`About | ${email}`}</title>
        </Head>
        {status === "authenticated" &&
        session.user.email == `${email}@gmail.com` ? (
          <Button onClick={() => router.push(`/${email}/about/edit`)}>
            수정
          </Button>
        ) : null}
        <Divider />
        {user.map((m) =>
          m.about ? (
            <div
              key={m.id}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(m.about),
              }}
            />
          ) : (
            <Header key={m.id}>등록된 자기소개가 없습니다!</Header>
          )
        )}
      </Segment>
    );
  }
}

export async function getStaticPaths() {
  const user = await prisma.user.findMany();
  return {
    paths: user.map((m) => ({
      params: {
        email: m.email,
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
  const email = params.email;

  return {
    props: { user, email },
    revalidate: 1,
  };
}
