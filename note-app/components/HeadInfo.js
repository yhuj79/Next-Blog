import Head from "next/head";

function HeadInfo({ title, keyword, contents }) {
  return (
    <Head>
      <title>{title}</title>
      <meta keyword={keyword} />
      <meta contents={contents} />
    </Head>
  );
}

HeadInfo.defaultProps = {
  title: "Note App",
  keyword: "Note App powered by NEXT.JS",
  contents: "Practice Project",
};

export default HeadInfo;
