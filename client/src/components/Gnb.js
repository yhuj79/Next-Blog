import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "semantic-ui-react";
import styles from "../../styles/Gnb.module.css";

export default function Gnb() {
  const router = useRouter();
  const { email } = router.query;

  return (
    <Menu className={styles.wrap} inverted>
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
