import { useRouter } from "next/router";
import Image from "next/image";
import { Segment, Item, Label, Button, Icon } from "semantic-ui-react";
import { useSession } from "next-auth/react";
import styles from "../../styles/PostList.module.css";
import Edit from "./Edit";

export default function PostList({
  id,
  email,
  title,
  thumbnail,
  category,
  desc,
  createdAt,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Segment
      className={styles.wrap}
      onClick={() => router.push(`/${email}/${encodeURIComponent(title)}`)}
      raised
    >
      <Item.Group divided style={{ display: "flex" }}>
        <Item>
          <div>
            <Image
              className={styles.thumbnail}
              src={thumbnail}
              width={258}
              height={128}
              alt={id}
              priority
            />
          </div>
          <Item.Content>
            <div className={styles.content_top}>
              <Item.Extra>
                <Label>{category}</Label>
              </Item.Extra>
              {status === "authenticated" &&
                session.user.email == `${email}@gmail.com` && (
                  <Edit id={id} email={email} title={title} />
                )}
            </div>
            <Item.Header>
              <h2>{title}</h2>
            </Item.Header>
            <Item.Meta>
              <span>{desc}</span>
            </Item.Meta>
            <Item.Description>{createdAt.slice(0, 10)}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
}
