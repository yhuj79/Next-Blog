import { useRouter } from "next/router";
import { Segment, Image, Item, Label, Button } from "semantic-ui-react";
import { useSession } from "next-auth/react";
import Delete from "./Delete";

export default function PostList({ postAll, email }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <Segment>
      {postAll.map((m) => (
        <Item.Group divided key={m.id} style={{ display: "flex" }}>
          <Item onClick={() => router.push(`/${email}/${m.title}`)}>
            <Item.Image src={`/images/${m.id}.png`} />
            <Item.Content>
              <Item.Header as="a">{m.title}</Item.Header>
              <Item.Meta>
                <span className="cinema">{m.desc}</span>
              </Item.Meta>
              <Item.Description>{m.createdAt}</Item.Description>
              <Item.Extra>
                <Label>{m.category}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
          {status === "authenticated" &&
          session.user.email == `${email}@gmail.com` ? (
            <div style={{ display: "flex" }}>
              <Button
                onClick={() =>
                  router.push({
                    pathname: `/${email}/${m.title}/update`,
                    query: { id: m.id },
                  })
                }
              >
                수정
              </Button>
              <Delete id={m.id} />
            </div>
          ) : null}
        </Item.Group>
      ))}
    </Segment>
  );
}
