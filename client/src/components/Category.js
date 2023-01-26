import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Segment } from "semantic-ui-react";
import styles from "../../styles/Category.module.css";

export default function Category({ postAll, email, act }) {
  const router = useRouter();

  const arr = [];
  const arrCount = [];
  postAll.map((m) => arr.push(m.category));
  postAll.map((m) => {
    let count = arr.filter((element) => m.category === element).length;
    arrCount.push({ category: m.category, count: count });
  });

  return (
    <Segment raised className={styles.wrap}>
      <Link
        className={styles.link}
        style={{ marginTop: "8px" }}
        href={{ pathname: `/${email}` }}
      >
        <Button
          className={act == "All" ? styles.button_act : styles.button}
          size="tiny"
        >
          All
        </Button>
      </Link>
      <div className={styles.overflow}>
        {arrCount
          .filter(
            (v, i) => postAll.findIndex((x) => x.category === v.category) === i
          )
          .map((m) => (
            <Link
              className={styles.link}
              key={m.category}
              href={{ pathname: `/${email}/category/${encodeURIComponent(m.category)}` }}
            >
              <Button
                className={
                  act == m.category ? styles.button_act : styles.button
                }
                size="tiny"
              >
                {m.category} ({m.count})
              </Button>
            </Link>
          ))}
      </div>
    </Segment>
  );
}
