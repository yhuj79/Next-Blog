import Head from "next/head";
import { useRouter } from "next/router";
import Quill from "../../src/components/Quill";

export default function Write() {
  const router = useRouter();
  const { email } = router.query;

  async function handler(body) {
    try {
      await fetch("/api/post/postWrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push(`/${email}/${encodeURI(body.title)}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>{`Post | ${email}`}</title>
      </Head>
      <Quill handler={handler} />
    </div>
  );
}
