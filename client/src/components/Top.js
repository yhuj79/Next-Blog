import { Header, Icon } from "semantic-ui-react";
import Gnb from "./Gnb";

export default function Top() {
  return (
    <div>
      <div style={{ display: "flex", paddingTop: 20 }}>
        <Icon
          name="blogger"
          size="huge"
          style={{ display: "block", width: 70, height: 70 }}
        />
        <Header as="h1" style={{ lineHeight: 0.5 }}>
          Next-Blog
        </Header>
      </div>
      <Gnb />
    </div>
  );
}
