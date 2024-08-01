import {
  Image,
  Header,
  Icon,
  Button,
  Label,
  Segment,
  Loader,
} from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../../styles/Top.module.css";
import { useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mediaQuery = useMediaQuery({
    query: "(min-width:0px) and (max-width:490px)",
  });
  useEffect(() => {
    setIsMobile(mediaQuery);
  }, [mediaQuery]);
  return isMobile;
}

export default function Top() {
  const router = useRouter();
  const { email } = router.query;
  const { data: session, status } = useSession();
  const sliceEmail = session?.user.email.substring(
    0,
    session.user.email.length - 10
  );
  const isMobile = useIsMobile();

  return (
    <div className={styles.wrap}>
      <Header className={styles.title_div} as="h1" inverted>
        <Link href={"/"} className={styles.title_icon_link}>
          <Icon className={styles.title_icon} name="blogger" />
        </Link>
        <Link
          href={email ? `/${email}` : "/"}
          className={styles.title_text_link}
        >
          <Header.Content>{email ? email : "NextBlog"}</Header.Content>
        </Link>
      </Header>
      {!isMobile ? (
        <div>
          {status === "loading" ? (
            <Loader />
          ) : status === "authenticated" ? (
            <div style={{ marginRight: "-3px" }}>
              {session.user.email == `${email}@gmail.com` ? (
                <Button
                  primary
                  style={{ marginRight: "10px" }}
                  className={styles.button}
                  onClick={() => router.push(`/${email}/write`)}
                >
                  새 글 작성
                </Button>
              ) : (
                <Button
                  primary
                  style={{ marginRight: "10px" }}
                  className={styles.button}
                  onClick={() => router.push(`/${sliceEmail}`)}
                >
                  내 블로그
                </Button>
              )}
              <Button
                secondary
                className={styles.button}
                style={{ marginTop: "-4px" }}
                animated="fade"
                onClick={() => signOut()}
              >
                <Button.Content visible>
                  <Image src={session.user.image} avatar />
                  <span>&nbsp;{session.user.name}</span>
                </Button.Content>
                <Button.Content hidden>Logout</Button.Content>
              </Button>
            </div>
          ) : (
            <Button
              secondary
              style={{ marginRight: "0" }}
              className={styles.button}
              animated="fade"
              onClick={() => signIn("google")}
            >
              <Button.Content visible>
                <Icon name="google" color="blue" />
                Sign in with Google
              </Button.Content>
              <Button.Content hidden>
                <Icon name="google" color="red" />
                Sign in with Google
              </Button.Content>
            </Button>
          )}
        </div>
      ) : (
        <div>
          {status === "authenticated" ? (
            <div style={{ display: "flex" }}>
              {session.user.email == `${email}@gmail.com` ? (
                <Icon
                  name="pencil"
                  circular
                  inverted
                  onClick={() => router.push(`/${email}/write`)}
                />
              ) : (
                <Icon
                  name="home"
                  circular
                  inverted
                  onClick={() => router.push(`/${sliceEmail}`)}
                />
              )}
              <Icon
                name="log out"
                circular
                inverted
                onClick={() => signOut()}
                style={{ marginLeft: "3px" }}
              />
            </div>
          ) : (
            <Icon
              name="google"
              circular
              inverted
              onClick={() => signIn("google")}
            />
          )}
        </div>
      )}
    </div>
  );
}
