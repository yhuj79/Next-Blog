import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Quill from "../../src/components/Quill";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

export default function Write() {
  const router = useRouter();
  const { email } = router.query;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handler(body) {
    setLoading(true);
    await fetch("/api/post/postWrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.status === 200) {
        router.push(`/${email}/${encodeURI(body.title)}`);
      } else if (res.status === 422) {
        setOpen(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }

  return (
    <div>
      <Head>
        <title>{`새 글 작성 | ${email}`}</title>
      </Head>
      <Quill handler={handler} loading={loading} />
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>
          <Icon name="warning circle" color="red" />
          작성 오류
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>아직 작성하지 않은 곳이 있어요!</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            확인
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
