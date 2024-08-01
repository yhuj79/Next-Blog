import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Header, Segment, Loader } from "semantic-ui-react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const sliceEmail = session?.user.email.substring(
    0,
    session.user.email.length - 10
  );

  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return (
      <Segment
        inverted
        style={{
          marginTop: "-1px",
          borderRadius: "7px",
          borderTopLeftRadius: "0",
        }}
      >
        <Head>
          <title>Welcome! | Next-Blog</title>
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Loader
            style={{ display: "inline-block" }}
            inline="centered"
            active
            size="large"
          >
            Loading...
          </Loader>
        </div>
      </Segment>
    );
  } else if (status === "unauthenticated") {
    return (
      <Segment
        inverted
        style={{
          marginTop: "-1px",
          borderRadius: "7px",
          borderTopLeftRadius: "0",
        }}
      >
        <Head>
          <title>Welcome! | Next-Blog</title>
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            flexDirection: "column",
          }}
        >
          <Header inverted as="h1">
            환영합니다!
          </Header>
          <Header inverted as="h3" style={{ marginBottom: "80px" }}>
            Google 계정으로 개인 블로그를 생성해 보세요.
          </Header>
          <p>1. Google 계정 연동 로그인 후 블로그 글과 소개글을 작성하세요.</p>
          <p>2. 카테고리별 글 확인, 검색, 수정, 삭제가 가능합니다.</p>
          <p>
            3. 이 사이트는 개인 연습용 프로젝트입니다. 민감한 개인정보는
            사용하지 말아주세요.
          </p>
          <Header inverted as="h3" style={{ marginTop: "50px" }}>
            Blog Example
          </Header>
          <div style={{ display: "flex" }}>
            <a
              style={{ margin: "20px", fontSize: "16px" }}
              href="https://next-blog-service.vercel.app/yhujblog"
              target="_blank"
            >
              yhujblog
            </a>
            <a
              style={{ margin: "20px", fontSize: "16px" }}
              href="https://next-blog-service.vercel.app/yanniwilla"
              target="_blank"
            >
              yanniwilla
            </a>
          </div>
        </div>
      </Segment>
    );
  } else {
    return (
      <Segment
        inverted
        style={{
          marginTop: "-1px",
          borderRadius: "7px",
          borderTopLeftRadius: "0",
        }}
      >
        <Head>
          <title>Welcome! | Next-Blog</title>
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            flexDirection: "column",
          }}
        >
          <Header inverted as="h1">
            {sliceEmail} 님 환영합니다!
          </Header>
          <Header inverted as="h3">
            {!loading ? (
              <Button primary
                onClick={() => {
                  setLoading(true);
                  router.push(`/${sliceEmail}`);
                }}
              >
                내 블로그로 이동
              </Button>
            ) : (
              <Button primary loading>내 블로그로 이동</Button>
            )}
          </Header>
          <Header inverted as="h3" style={{ marginBottom: "80px" }}>
            Google 계정으로 개인 블로그를 생성해 보세요.
          </Header>
          <p>1. Google 계정 연동 로그인 후 블로그 글과 소개글을 작성하세요.</p>
          <p>2. 카테고리별 글 확인, 검색, 수정, 삭제가 가능합니다.</p>
          <p>
            3. 이 사이트는 개인 연습용 프로젝트입니다. 민감한 개인정보는
            사용하지 말아주세요.
          </p>
          <Header inverted as="h3" style={{ marginTop: "50px" }}>
            Blog Example
          </Header>
          <div style={{ display: "flex" }}>
            <a
              style={{ margin: "20px", fontSize: "16px" }}
              href="https://next-blog-service.vercel.app/yhujblog"
              target="_blank"
            >
              yhujblog
            </a>
            <a
              style={{ margin: "20px", fontSize: "16px" }}
              href="https://next-blog-service.vercel.app/yanniwilla"
              target="_blank"
            >
              yanniwilla
            </a>
          </div>
        </div>
      </Segment>
    );
  }
}
