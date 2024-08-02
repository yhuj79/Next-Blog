import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Head from "next/head";
import { Icon, Button, Header, Segment } from "semantic-ui-react";
import styles from "../../styles/Info.module.css";

const HomeAuth = ({ auth, sliceEmail }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Segment inverted className={styles.wrap}>
      <Head>
        <title>Welcome! | Next-Blog</title>
      </Head>
      <div className={styles.info_div}>
        {auth ? (
          <Header inverted as="h1" className={styles.text_h1_email}>
            {sliceEmail} 님 환영합니다!
          </Header>
        ) : (
          <Header inverted as="h1" className={styles.text_h1}>
            환영합니다!
          </Header>
        )}
        <Header className={styles.text_h3} inverted as="h3">
          Google 계정으로 개인 블로그를 생성해 보세요.
        </Header>
        <Header inverted as="h3">
          {auth ? (
            !loading ? (
              <Button
                primary
                onClick={() => {
                  setLoading(true);
                  router.push(`/${sliceEmail}`);
                }}
              >
                내 블로그로 이동
              </Button>
            ) : (
              <Button primary loading>
                내 블로그로 이동
              </Button>
            )
          ) : (
            <Button primary animated="fade" onClick={() => signIn("google")}>
              <Button.Content visible>
                <Icon name="google" />
                Sign in with Google
              </Button.Content>
              <Button.Content hidden>
                <Icon name="google" color="red" />
                Sign in with Google
              </Button.Content>
            </Button>
          )}
        </Header>
        <div className={styles.text_small}>
          <p>Google 계정 연동 로그인 후 블로그 글과 소개글을 작성하세요.</p>
          <p>카테고리별 글 확인, 검색, 수정, 삭제가 가능합니다.</p>
          <p>
            페이지에 최초 접속을 하는 경우 로딩이 다소 느리게 느껴질 수
            있습니다.
          </p>
          <p>첫 로딩 이후 재접속 시에는 빠르고 원활한 브라우징이 가능합니다.</p>
          <p>
            이 사이트는 개인 연습용 프로젝트입니다. 민감한 개인정보는 사용하지
            말아주세요.
          </p>
        </div>
        <Header inverted as="h3">
          Blog Example
        </Header>
        <div>
          <a
            className={styles.link}
            href="https://next-blog-service.vercel.app/yhujblog"
            target="_blank"
          >
            YhujBlog
          </a>
          <a
            className={styles.link}
            href="https://next-blog-service.vercel.app/yanniwilla"
            target="_blank"
          >
            YanniWilla
          </a>
        </div>
      </div>
    </Segment>
  );
};

export default HomeAuth;
