import Head from "next/head";
import { useRouter } from "next/router";
import Spinner from "../../../src/components/Spinner";
import { Segment, Divider, Button } from "semantic-ui-react";
import DOMPurify from "isomorphic-dompurify";
import { useSession } from "next-auth/react";

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
          <Button onClick={() => router.push(`/${email}/about/update`)}>
            수정
          </Button>
        ) : null}
        <Divider />
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(user[0].about),
          }}
        />
      </Segment>
    );
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { email: "tu7348001" } }],
    fallback: true,
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
  };
}
