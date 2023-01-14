import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "semantic-ui-react";

export default function Gnb() {
  const router = useRouter();
  const { email } = router.query;

  return (
    <Menu inverted style={{ marginTop: 0 }}>
      <Link href={`/${email}`}>
        <Menu.Item name="글" />
      </Link>
      <Link href={`/${email}/about`}>
        <Menu.Item name="소개" />
      </Link>
      {/* <Link href={`/${email}/category`}>
        <Menu.Item name="카테고리" />
      </Link> */}
    </Menu>
  );
}
