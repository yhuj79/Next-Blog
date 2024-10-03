import { useRouter } from "next/router";
import { Segment, Item, Label, Button, Icon, Loader } from "semantic-ui-react";
import { useSession } from "next-auth/react";
import styles from "../../styles/PostList.module.css";
import Edit from "./Edit";
import { useState } from "react";
import Image from "next/image";

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
  const [loading, setLoading] = useState(false);

  return (
    <Segment
      className={styles.wrap}
      onClick={() => {
        setLoading(true);
        router.push(`/${email}/${encodeURIComponent(title)}`);
      }}
      raised
    >
      <Item.Group divided style={{ display: "flex" }}>
        <Item>
          <Image
            className={styles.thumbnail}
            src={thumbnail}
            alt={id}
            loading="lazy"
            width={10000}
            height={10000}
          />
          <Item.Content>
            <div className={styles.content_top}>
              <Item.Extra className={styles.label}>
                <Label>{category}</Label>
                {loading && (
                  <Loader
                    style={{ display: "inline-block" }}
                    inline="centered"
                    active
                    size="tiny"
                  />
                )}
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
              <span className={styles.desc}>{desc}</span>
            </Item.Meta>
            <Item.Description>{createdAt.slice(0, 10)}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
}
