import { Image, Header, Icon, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Gnb from "./Gnb";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Top() {
  const router = useRouter();
  const { email } = router.query;
  const { data: session, status } = useSession();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={`/${email}`} style={{ display: "flex", marginTop: 20 }}>
          <Icon
            color="black"
            name="blogger"
            size="huge"
            style={{ display: "block", width: 70, height: 70 }}
          />
          <Header as="h1" style={{ lineHeight: 0.3 }}>
            {email}'s Blog
          </Header>
        </Link>
        <div style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
          {status === "authenticated" ? (
            <div style={{ display: "flex" }}>
              {session.user.email == `${email}@gmail.com` ? (
                <Button animated onClick={() => router.push(`/${email}/write`)}>
                  <Button.Content visible>Add Post</Button.Content>
                  <Button.Content hidden>
                    <Icon name="pencil" />
                  </Button.Content>
                </Button>
              ) : null}
              <Button animated="fade" onClick={() => signOut()}>
                <Button.Content visible>
                  <Image src={session.user.image} avatar />
                  <span>&nbsp;{session.user.name}</span>
                </Button.Content>
                <Button.Content hidden>Logout</Button.Content>
              </Button>
              <Button animated>
                <Button.Content visible>
                  <Icon name="info circle" />
                  Info
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
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
      <Gnb />
    </div>
  );
}
