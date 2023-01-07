import { Segment, Divider, Header, Image, Label } from "semantic-ui-react";
import DOMPurify from "isomorphic-dompurify";

export default function PostContentsGrid({ postContents }) {
  return (
    <Segment>
      <Label>{postContents[0].category}</Label>
      <Image
        src={`../..../../images/${postContents[0].id}.png`}
        style={{ marginTop: "1em", width: 200 }}
      />
      <Header as="h1">{postContents[0].title}</Header>
      <Header as="h3">{postContents[0].createdAt}</Header>
      <Header as="h3">{postContents[0].desc}</Header>
      <Divider />
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(postContents[0].content),
        }}
      />
    </Segment>
  );
}
