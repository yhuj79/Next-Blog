import { useRouter } from "next/router";
import { Segment, Image, Item, Label, Button, Icon } from "semantic-ui-react";
import { useSession } from "next-auth/react";
import styles from "../../styles/PostList.module.css";
import Edit from "./Edit";

export default function PostList({ postAll, email }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <div>
      {postAll.map((m) => (
        <Segment
          className={styles.wrap}
          onClick={() => router.push(`/${email}/${m.title}`)}
          key={m.id}
          raised
        >
          <Item.Group divided style={{ display: "flex" }}>
            <Item>
              <img className={styles.thumbnail} src={m.thumbnail} />
              <Item.Content>
                <div className={styles.content_first}>
                  <Item.Extra>
                    <Label>{m.category}</Label>
                  </Item.Extra>
                  {status === "authenticated" &&
                    session.user.email == `${email}@gmail.com` && (
                      <Edit id={m.id} email={email} title={m.title} />
                    )}
                </div>
                <Item.Header>
                  <h2>{m.title}</h2>
                </Item.Header>
                <Item.Meta>
                  <span>{m.desc}</span>
                </Item.Meta>
                <Item.Description>{m.createdAt.slice(0, 10)}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      ))}
    </div>
  );
}
