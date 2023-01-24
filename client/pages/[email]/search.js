import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Header, Input, Segment } from "semantic-ui-react";
import PostList from "../../src/components/PostList";
import styles from "../../styles/EmptySpace.module.css";

export default function search() {
  const router = useRouter();
  const { email } = router.query;

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);

  function handleChange(input) {
    setInput(input);
  }

  async function searchPost() {
    setLoading(true);

    await fetch(`/api/search/${email}/${input}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setResult(data);
      })
      .catch((err) => {
        setLoading(false);
        setResult(null);
      });
  }

  return (
    <Segment>
      <Head>
        <title>{`검색 | Next-Blog`}</title>
      </Head>
      <Header as="h3">{email}님의 게시글 검색</Header>
      <Input
        style={{ width: "100%" }}
        type="text"
        placeholder="검색어를 입력하세요"
        size="huge"
        action
      >
        <input
          style={{ width: "0%" }}
          onChange={(e) => handleChange(e.target.value)}
        />
        {!loading ? (
          <Button type="submit" onClick={searchPost}>
            검색
          </Button>
        ) : (
          <Button loading>검색</Button>
        )}
      </Input>
      {result && result.length > 0 && (
        <Header style={{ textAlign: "center" }} as="p">
          {result.length} 개의 검색 결과
        </Header>
      )}
      {result ? (
        result.map((m) => (
          <PostList
            key={m.id}
            id={m.id}
            email={email}
            title={m.title}
            thumbnail={m.thumbnail}
            category={m.category}
            desc={m.desc}
            createdAt={m.createdAt}
          />
        ))
      ) : (
        <div className={styles.wrap}>
          <Header className={styles.title}>검색 결과가 없습니다.</Header>
        </div>
      )}
    </Segment>
  );
}
