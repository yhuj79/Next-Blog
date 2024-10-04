import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DOMPurify from "isomorphic-dompurify";
import prisma from "../../../lib/prisma";
import Spinner from "../../../src/components/Spinner";
import EmptySpace from "../../../src/components/EmptySpace";
import { Segment, Divider, Button, Header, Icon } from "semantic-ui-react";
import styles from "../../../styles/Edit.module.css";
import "react-quill/dist/quill.core.css";

export default function About({ user, email }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState();

  return (
    <Segment>
      <Head>
        <title>{`소개 | ${email}`}</title>
      </Head>
      {user.map((m) =>
        m.about && m.about.replace(/<[^>]*>?/g, "").length > 0 ? (
          <div key={m.id}>
            {status === "authenticated" &&
              session.user.email == `${email}@gmail.com` &&
              (!loading ? (
                <Icon
                  name="edit"
                  className={styles.icon_about}
                  onClick={() => {
                    setLoading(true);
                    router.push(`/${email}/about/edit`);
                  }}
                />
              ) : (
                <Icon
                  name="spinner"
                  className={styles.icon_about}
                  style={{ marginTop: "3px" }}
                  loading
                />
              ))}
            <div
              className="view ql-editor"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(m.about),
              }}
            />
          </div>
        ) : (
          <EmptySpace router={router} key={m.id} email={email} type={"소개"} />
        )
      )}
    </Segment>
  );
}

export async function getStaticPaths() {
  const user = await prisma.user.findMany();
  return {
    paths: user.map((m) => ({
      params: {
        email: m.email,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const user = await prisma.user.findMany({
    where: {
      email: `${params.email}@gmail.com`,
    },
  });
  const email = params.email;

  if (user.length > 0) {
    const email = params.email;
    return {
      props: { user, email },
      revalidate: 1,
    };
  } else {
    return {
      notFound: true,
    };
  }
}
