import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import styles from "../../styles/Edit.module.css";

export default function Edit({ id, email, title }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function onClickDelete() {
    try {
      setLoading(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/post/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      await router.push(`/${email}`);
    } catch (error) {
      setLoading(false);
      setOpen(false);
      console.log(error);
    }
  }

  return (
    <div className={styles.wrap}>
      {!loading ? (
        <Icon
          name="edit"
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            setLoading(true);
            router.push({
              pathname: `/${email}/${title}/edit`,
              query: { id: id },
            });
          }}
        />
      ) : (
        <Icon name="spinner" loading />
      )}
      &nbsp;
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          !loading && (
            <Icon
              name="trash alternate"
              className={styles.icon}
              onClick={(e) => e.stopPropagation()}
            />
          )
        }
      >
        <Modal.Header>
          <Icon name="warning circle" color="red" />
          게시물 삭제
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>{title}</Header>
            <p>정말로 삭제하시겠습니까?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {!loading ? (
            <Button
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                onClickDelete();
              }}
            >
              확인
            </Button>
          ) : (
            <Button color="red" loading>
              확인
            </Button>
          )}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            취소
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
