import Link from "next/link";
import Head from "next/head";
import { Icon } from "semantic-ui-react";
import styles from "../styles/error.module.css";

function Error({ statusCode }) {
  return (
    <div className={styles.wrap}>
      <Head>
        <title>{`${statusCode} | Next-Blog`}</title>
      </Head>
      <div className={styles.wrap_box}>
        <Icon name="warning circle" color="red" size="huge" />
        <Header as="h1" className={styles.title}>
          <Header.Content>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : "An error occurred on client"}
          </Header.Content>
        </Header>
        <Link href="/">
          <Button className={styles.button} size="large">
            Next-Blog 메인
          </Button>
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
