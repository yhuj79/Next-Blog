import { Segment, Divider, Header, Image, Label } from "semantic-ui-react";
import DOMPurify from "isomorphic-dompurify";

export default function PostGrid({ postContents }) {
  return (
    <div>
      {postContents.map((m) => (
        <Segment key={m.id}>
          <Label>{m.category}</Label>
          <Image
            src={`../..../../images/${m.id}.png`}
            style={{ marginTop: "1em", width: 200 }}
          />
          <Header as="h1">{m.title}</Header>
          <Header as="h3">{m.createdAt}</Header>
          <Header as="h3">{m.desc}</Header>
          <Divider />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(m.content),
            }}
          />
        </Segment>
      ))}
    </div>
  );
}
