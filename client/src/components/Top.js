import { Image, Header, Icon, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Top.module.css";

export default function Top() {
  const router = useRouter();
  const { email } = router.query;
  const { data: session, status } = useSession();

  return (
    <div className={styles.wrap}>
      {email ? (
        <Link href={`/${email}`} className={styles.title}>
          <Icon
            color="black"
            name="blogger"
            size="huge"
            className={styles.logo}
          />
          <Header as="h1" style={{ lineHeight: 0.3 }}>
            {email} Blog
          </Header>
        </Link>
      ) : (
        <Link href={"/"} className={styles.title}>
          <Icon
            color="black"
            name="blogger"
            size="huge"
            className={styles.logo}
          />
          <Header as="h1" style={{ lineHeight: 0.3 }}>
            Next Blog
          </Header>
        </Link>
      )}
      <div style={{ display: "flex" }}>
        {status === "authenticated" &&
        session.user.email == `${email}@gmail.com` ? (
          <div style={{ display: "flex" }}>
            <Button animated onClick={() => router.push(`/${email}/write`)}>
              <Button.Content visible>새 글 작성</Button.Content>
              <Button.Content hidden>
                <Icon name="pencil" />
              </Button.Content>
            </Button>
            <Button animated="fade" onClick={() => signOut()}>
              <Button.Content visible>
                <Image src={session.user.image} avatar />
                <span>&nbsp;{session.user.name}</span>
              </Button.Content>
              <Button.Content hidden>Logout</Button.Content>
            </Button>
          </div>
        ) : (
          <Button animated="fade" onClick={() => signIn("google")}>
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
    </div>
  );
}
