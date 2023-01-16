import { useRouter } from "next/router";
import { Segment, Image, Item, Label, Button } from "semantic-ui-react";
import { useSession } from "next-auth/react";
import Delete from "./Delete";

export default function PostList({ postAll, email }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <div>
      {postAll.map((m) => (
        <Segment key={m.id} raised>
          <Item.Group divided style={{ display: "flex" }}>
            <Item onClick={() => router.push(`/${email}/${m.title}`)}>
              <Item.Image src={`/images/${m.id}.png`} size="small" />
              <Item.Content>
                <Item.Header as="h1">{m.title}</Item.Header>
                <Item.Meta>
                  <span className="cinema">{m.desc}</span>
                </Item.Meta>
                <Item.Description>{m.createdAt.slice(0, 10)}</Item.Description>
                <Item.Extra>
                  <Label>{m.category}</Label>
                </Item.Extra>
              </Item.Content>
            </Item>
            {status === "authenticated" &&
              session.user.email == `${email}@gmail.com` ? (
                <Item.Content>
                  <Delete id={m.id} />
                  <Button
                    floated="right"
                    onClick={() =>
                      router.push({
                        pathname: `/${email}/${m.title}/edit`,
                        query: { id: m.id },
                      })
                    }
                  >
                    수정
                  </Button>
                </Item.Content>
              ) : null}
          </Item.Group>
        </Segment>
      ))}
    </div>
  );
}
