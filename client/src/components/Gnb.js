import { useRouter } from "next/router";
import { Menu } from "semantic-ui-react";

export default function Gnb() {
  const router = useRouter();
  const { email } = router.query;

  return (
    <Menu inverted style={{ marginTop: 0 }}>
      <Menu.Item
        name="home"
        onClick={() => router.push(`/${email}`)}
      />
      <Menu.Item
        name="about"
        onClick={() => router.push(`/${email}/about`)}
      />
      <Menu.Item
        name="category"
        onClick={() => router.push(`/${email}/category`)}
      />
    </Menu>
  );
}
