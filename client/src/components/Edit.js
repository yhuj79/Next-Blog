import { useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import styles from "../../styles/Edit.module.css";

export default function Edit({ id, email, title }) {
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

  if (!loading) {
    return (
      <div className={styles.wrap}>
        <Icon
          name="edit"
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            router.push({
              pathname: `/${email}/${title}/edit`,
              query: { id: id },
            });
          }}
        />
        &nbsp;
        <Icon
          name="trash alternate"
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            onClickDelete();
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    );
  } else {
    return <Icon name="spinner" loading />;
  }
}
