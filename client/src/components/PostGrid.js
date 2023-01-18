import { Segment, Divider, Header, Image, Label } from "semantic-ui-react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.core.css";
import styles from "./PostGrid.module.css";

export default function PostGrid({ postContents }) {
  return (
    <div className={styles.wrap}>
      {postContents.map((m) => (
        <Segment key={m.id}>
          <Label>{m.category}</Label>
          <Image
            src={m.thumbnail}
            style={{ marginTop: "1em", width: 200 }}
          />
          <Header as="h1">{m.title}</Header>
          <Header as="h3">{m.createdAt}</Header>
          <Header as="h3">{m.desc}</Header>
          <Divider />
          <div
            className="view ql-editor"
            id={styles.article}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(m.content),
            }}
          />
        </Segment>
      ))}
    </div>
  );
}
