import { Segment, Divider, Header, Label } from "semantic-ui-react";
import { useSession } from "next-auth/react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.core.css";
import styles from "../../styles/PostGrid.module.css";
import Edit from "./Edit";

export default function PostGrid({ postContents }) {
  const { data: session, status } = useSession();
  return (
    <div>
      {postContents.map((m) => {
        const localEmail = m.email.split('@')[0];
        return (
          <Segment key={m.id}>
            <div className={styles.wrap_top}>
              <Label style={{ marginTop: "8px" }}>
                {m.category}&emsp;·&emsp;{m.createdAt.slice(0, 10)}
              </Label>
              {status === "authenticated" &&
                session.user.email == `${m.email}` && (
                  <Edit id={m.id} email={localEmail} title={m.title} />
                )}
            </div>
            <Divider />
            <Header as="h1" style={{ fontSize: "40px" }}>
              {m.title}
            </Header>
            <Header as="h2">{m.desc}</Header>
            <Divider />
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
        );
      })}
    </div>
  );
}
