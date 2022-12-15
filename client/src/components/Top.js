import { Header, Icon, Button } from "semantic-ui-react";
import Gnb from "./Gnb";
import Link from "next/link";

export default function Top() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", marginTop: 20, width: 210 }}>
          <Icon
            color="black"
            name="blogger"
            size="huge"
            style={{ display: "block", width: 70, height: 70 }}
          />
          <Header as="h1" style={{ lineHeight: 0.3 }}>
            Next-Blog
          </Header>
        </Link>
        <div style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
          <Link href="/login">
            <Button animated>
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Link>
          <Button animated="vertical">
            <Button.Content hidden>Vertical</Button.Content>
            <Button.Content visible>
              <Icon name="sitemap" />
            </Button.Content>
          </Button>
          <Button animated="fade">
            <Button.Content visible>Fade</Button.Content>
            <Button.Content hidden>Text</Button.Content>
          </Button>
        </div>
      </div>
      <Gnb />
    </div>
  );
}
