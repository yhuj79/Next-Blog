import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Segment } from "semantic-ui-react";

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
    <Segment raised>
      <Link href={{ pathname: `/${email}` }}>
        <Button style={act == "All" ? { backgroundColor: "skyblue" } : {}}>
          All
        </Button>
      </Link>
      {arrCount
        .filter(
          (v, i) => postAll.findIndex((x) => x.category === v.category) === i
        )
        .map((m) => (
          <Link
            key={m.category}
            href={{ pathname: `/${email}/category/${m.category}` }}
          >
            <Button
              style={act == m.category ? { backgroundColor: "skyblue" } : {}}
            >
              {m.category} ({m.count})
            </Button>
          </Link>
        ))}
    </Segment>
  );
}
