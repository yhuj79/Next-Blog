import { Segment, Divider, Header, Label } from "semantic-ui-react";
import { useSession } from "next-auth/react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.core.css";
import styles from "../../styles/PostGrid.module.css";
import Edit from "./Edit";

export default function PostGrid({ postContents }) {
  const { data: session, status } = useSession();
  return (
    <div className={styles.wrap}>
      {postContents.map((m) => (
        <Segment key={m.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Label style={{ marginTop: "10px" }}>
              {m.category}&emsp;·&emsp;{m.createdAt.slice(0, 10)}
            </Label>
            {status === "authenticated" &&
              session.user.email == `${m.email}` && (
                <Edit id={m.id} email={m.email.slice(0, 9)} title={m.title} />
              )}
          </div>
          <Header as="h1" style={{ fontSize: "40px" }}>
            {m.title}
          </Header>
          <Header as="h2">{m.desc}</Header>
          <img className={styles.thumbnail_img} src={m.thumbnail} />
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
