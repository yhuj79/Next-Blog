import { Segment, Divider, Header, Image, Label } from "semantic-ui-react";
import DOMPurify from 'isomorphic-dompurify';

export default function PostGrid({ post }) {
  return (
    <Segment>
      <Label>{post.category}</Label>
      <Image
        src={`../..../../images/${post.id}.png`}
        style={{ marginTop: "1em", width: 200 }}
      />
      <Header as="h1">{post.title}</Header>
      <Header as="h3">{post.createdAt}</Header>
      <Header as="h3">{post.desc}</Header>
      <Divider />
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      />
    </Segment>
  );
}
