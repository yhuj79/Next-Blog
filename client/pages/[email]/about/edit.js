import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import prisma from "../../../hooks/prisma";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button, Input, Divider } from "semantic-ui-react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function AboutEdit({ user }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const sliceEmail = email?.slice(0, 9);

  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState(`${user.map((m) => m.about)}`);

  async function onClickAbout() {
    setLoading(true);
    try {
      const body = { email, about };
      await fetch("/api/about/aboutEdit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push(`/${sliceEmail}/about`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>{`소개 | ${sliceEmail}`}</title>
      </Head>
      <Divider />
      {!loading ? (
        <Button onClick={onClickAbout}>저장하기</Button>
      ) : (
        <Button loading>저장하기</Button>
      )}
      <Divider />
      <ReactQuill
        placeholder="About"
        theme="snow"
        value={about}
        onChange={setAbout}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await prisma.user.findMany({
    where: {
      email: `${context.params.email}@gmail.com`,
    },
  });

  return {
    props: { user },
  };
}

const toolbarOptions = [
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];
const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};
