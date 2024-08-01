import { useSession } from "next-auth/react";
import { Button, Header } from "semantic-ui-react";
import styles from "../../styles/EmptySpace.module.css";

export default function EmptySpace({ router, email, type }) {
  const { data: session, status } = useSession();
  return (
    <div className={styles.wrap}>
      <Header className={styles.title}>아직 등록되지 않았습니다!</Header>
      {status === "authenticated" &&
        session.user.email == `${email}@gmail.com` && (
          <Button
            primary
            className={styles.button}
            onClick={() =>
              type == "글"
                ? router.push(`/${email}/write`)
                : router.push(`/${email}/about/edit`)
            }
          >
            {type} 작성하기
          </Button>
        )}
    </div>
  );
}
