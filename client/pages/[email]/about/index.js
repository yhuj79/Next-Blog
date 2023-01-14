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
          <title>{`소개 | ${email}`}</title>
        </Head>
        {status === "authenticated" &&
        session.user.email == `${email}@gmail.com` ? (
          <Button onClick={() => router.push(`/${email}/about/edit`)}>
            수정하기
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

export async function getServerSideProps(context) {
  const user = await prisma.user.findMany({
    where: {
      email: `${context.params.email}@gmail.com`,
    },
  });
  const email = context.params.email;

  if (user.length > 0) {
    const email = context.params.email;
    return {
      props: { user, email },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
