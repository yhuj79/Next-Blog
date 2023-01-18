import Link from "next/link";
import Head from "next/head";
import { Icon } from "semantic-ui-react";
import styles from "../styles/Error.module.css";

function Error({ statusCode }) {
  return (
    <div className={styles.wrap}>
      <Head>
        <title>{`${statusCode} | Next-Blog`}</title>
      </Head>
      <div className={styles.wrap_box}>
        <Header as="h1">
          <Icon name="warning circle" color="red" />
          <Header.Content>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : "An error occurred on client"}
          </Header.Content>
        </Header>
        <Link href="/">
          <Button size="large">Next-Blog 메인</Button>
        </Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
