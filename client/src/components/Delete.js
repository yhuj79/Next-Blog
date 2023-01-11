import { useRouter } from "next/router";
import { Button, Icon } from "semantic-ui-react";

export default function Delete({ id }) {
  const router = useRouter();

  async function onClickDelete() {
    try {
      await fetch(`api/post/delete/${id}`, {
        method: "DELETE",
      });
      await router.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button onClick={onClickDelete}>
      <Icon name="delete" color="red" />
    </Button>
  );
}
