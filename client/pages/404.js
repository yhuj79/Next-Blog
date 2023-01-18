import Link from "next/link";
import Head from "next/head";
import { Button, Header, Icon } from "semantic-ui-react";
import styles from "../styles/error.module.css";

export default function Error404() {
  return (
    <div className={styles.wrap}>
      <Head>
        <title>{`404 | Next-Blog`}</title>
      </Head>
      <div className={styles.wrap_box}>
        <Header as="h1">
          <Icon name="warning circle" color="red" />
          <Header.Content>404 : 페이지를 찾을 수 없습니다.</Header.Content>
        </Header>
        <Link href="/">
          <Button size="large">Next-Blog 메인</Button>
        </Link>
      </div>
    </div>
  );
}
