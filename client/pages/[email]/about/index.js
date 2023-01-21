import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../../src/components/Spinner";
import { Segment, Divider, Button, Header, Icon } from "semantic-ui-react";
import DOMPurify from "isomorphic-dompurify";
import { useSession } from "next-auth/react";
import prisma from "../../../hooks/prisma";
import styles from "../../../styles/Edit.module.css";
import EmptySpace from "../../../src/components/EmptySpace";

export default function About({ user, email }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState();

  if (!user) {
    return <Spinner />;
  } else {
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
            <EmptySpace
              router={router}
              key={m.id}
              email={email}
              type={"소개"}
            />
          )
        )}
      </Segment>
    );
  }
}

export async function getServerSideProps(context) {
  const user = await prisma.user.findMany({
    where: {
      email: `${context.params.email}@gmail.com`,
    },
  });
  const email = context.params.email;

  if (user.length > 0) {
    const email = context.params.email;
    return {
      props: { user, email },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
