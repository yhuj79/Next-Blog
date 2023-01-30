import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const sliceEmail = session?.user.email.substring(
    0,
    session.user.email.length - 10
  );

  const [loading, setLoading] = useState(false);

  return (
    <Segment inverted style={{ marginTop: "-1px", borderTopLeftRadius: 0 }}>
      <Head>
        <title>Welcome! | Next-Blog</title>
      </Head>
      {status === "unauthenticated" ? (
        <div style={{ textAlign: "center", padding: "220px 0" }}>
          <Header inverted as="h1">
            Welcome!
          </Header>
          <Header inverted as="h3">
            Google 계정으로 개인 블로그를 생성해 보세요
          </Header>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "220px 0" }}>
          <Header inverted as="h1">
            Welcome! {sliceEmail}
          </Header>
          <Header inverted as="h3">
            {!loading ? (
              <Button
                onClick={() => {
                  setLoading(true);
                  router.push(`/${sliceEmail}`);
                }}
              >
                내 블로그로 이동
              </Button>
            ) : (
              <Button loading>
                내 블로그로 이동
              </Button>
            )}
          </Header>
        </div>
      )}
    </Segment>
  );
}
