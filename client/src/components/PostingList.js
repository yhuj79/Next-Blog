import { Button, Icon, Image, Item, Label } from "semantic-ui-react";

export default function PostingList({ posting }) {
  return (
    <Item.Group divided>
      {posting.map((m) => (
        <Item key={m.id}>
          <Item.Image src={`/images/${m.id}.png`} />
          <Item.Content>
            <Item.Header as="a">{m.title}</Item.Header>
            <Item.Meta>
              <span className="cinema">{m.content}</span>
            </Item.Meta>
            <Item.Description>{m.createdAt}</Item.Description>
            <Item.Extra>
              <Label>category</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
}
