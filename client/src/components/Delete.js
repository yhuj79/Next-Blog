import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Icon } from "semantic-ui-react";

export default function Delete({ id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function onClickDelete() {
    try {
      setLoading(true);
      await fetch(`api/post/delete/${id}`, {
        method: "DELETE",
      });
      await router.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return !loading ? (
    <Button onClick={onClickDelete} floated="right">
      삭제
    </Button>
  ) : (
    <Button loading>삭제</Button>
  );
}
