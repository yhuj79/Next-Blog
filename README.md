<img align=top src="https://raw.githubusercontent.com/yhuj79/Next-Blog/main/assets/thumbnail.png" width="500">

Google 계정으로 간편하게 생성하는 블로그 플랫폼

:ballot_box_with_check: <a target="_blank" rel="noopener noreferrer" href="https://next-blog-service.vercel.app">Next-Blog Home</a>

:ballot_box_with_check: <a target="_blank" rel="noopener noreferrer" href="https://next-blog-service.vercel.app/yhujblog">개발 정보 블로그 샘플</a>

:ballot_box_with_check: <a target="_blank" rel="noopener noreferrer" href="https://next-blog-service.vercel.app/yanniwilla">여행 정보 블로그 샘플</a>

## Built With

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white&style=flat" height=25 />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white&style=flat" height=25 />
  <img alt="PlanetScale" src="https://img.shields.io/badge/PlanetScale-000000?style=for-the-badge&logo=planetscale&logoColor=white&style=flat" height=25 />
  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white&style=flat" height=25 />
  <img alt="Semantic UI React" src="https://img.shields.io/badge/Semantic UI React-35BDB2?logo=semantic+ui+react&logoColor=white&style=flat" height=25 />
</p>

## About The Project

<div>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Next-Blog/main/assets/1.png width=300>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Next-Blog/main/assets/2.png width=300>
</div>
<div>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Next-Blog/main/assets/3.png width=300>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Next-Blog/main/assets/4.png width=300>
</div>
<div>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Next-Blog/main/assets/5.png width=300>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Next-Blog/main/assets/6.png width=300>
</div>

### :alarm_clock: 제작 기간

- 2022.12.09 ~ 2023.01.30
- 2024.08.01 ~ 2024.08.03 (수정)

### :gear: 개발 환경

- Visual Studio Code
- Next.js 13.0.6
- Next-Auth 4.18.8
- Prisma 4.7.1
- Firebase 9.15.0

### :clipboard: 주요 기능 설명

- [Platform Home](https://github.com/yhuj79/Next-Blog/wiki/Platform-Home)
- [Post (List)](https://github.com/yhuj79/Next-Blog/wiki/Post-(List))
- [Post (Grid)](https://github.com/yhuj79/Next-Blog/wiki/Post-(Grid))
- [About](https://github.com/yhuj79/Next-Blog/wiki/About)
- [Write](https://github.com/yhuj79/Next-Blog/wiki/Write)
- [Quill](https://github.com/yhuj79/Next-Blog/wiki/Quill)

### :page_facing_up: API

- [Schema](https://github.com/yhuj79/Next-Blog/blob/main/client/prisma/schema.prisma) ([Prisma schema 가이드라인](https://www.prisma.io/docs/concepts/components/prisma-schema)을 따름)
- [Prisma Client](https://github.com/yhuj79/Next-Blog/blob/main/client/hooks/prisma.js)
- [NextAuth](https://github.com/yhuj79/Next-Blog/blob/main/client/pages/api/auth/%5B...nextauth%5D.js) (Google 로그인 연동)
- [새 글 작성](https://github.com/yhuj79/Next-Blog/blob/main/client/pages/api/post/postWrite.js)
- [글 수정](https://github.com/yhuj79/Next-Blog/blob/main/client/pages/api/post/edit/%5Bid%5D.js)
- [글 삭제](https://github.com/yhuj79/Next-Blog/blob/main/client/pages/api/post/delete/%5Bid%5D.js)
- [소개 글 업데이트](https://github.com/yhuj79/Next-Blog/blob/main/client/pages/api/about/aboutEdit.js)
- [글 검색](https://github.com/yhuj79/Next-Blog/blob/main/client/pages/api/search/%5Bemail%5D/%5Binput%5D.js)

### :open_file_folder: Package

- [x] semantic-ui-react
- [x] prisma client
- [x] prisma adapter
- [x] firebase
- [x] react-quill
- [x] react-markdown
- [x] next-auth
- [x] dompurify

## Reference

[https://www.prisma.io/docs/concepts/components/prisma-schema](https://www.prisma.io/docs/concepts/components/prisma-schema)

[https://vercel.com/guides/nextjs-prisma-postgres](https://vercel.com/guides/nextjs-prisma-postgres)

[https://cpro95.tistory.com/528?category=929244](https://cpro95.tistory.com/528?category=929244)

[https://velog.io/@kip/ssr%EC%8B%9C-%EC%97%90%EB%94%94%ED%84%B0-%EC%A0%81%EC%9A%A9dynamic](https://velog.io/@kip/ssr%EC%8B%9C-%EC%97%90%EB%94%94%ED%84%B0-%EC%A0%81%EC%9A%A9dynamic)

[https://blog.toycrane.xyz/7%EB%B6%84%EB%A7%8C%EC%97%90-next-auth-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-d4432ff97158](https://blog.toycrane.xyz/7%EB%B6%84%EB%A7%8C%EC%97%90-next-auth-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-d4432ff97158)

[https://mingeesuh.tistory.com/entry/Firebase-%EC%9B%B9-%ED%8C%8C%EC%9D%B4%EC%96%B4%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EB%A7%81%ED%81%AC-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0](https://mingeesuh.tistory.com/entry/Firebase-%EC%9B%B9-%ED%8C%8C%EC%9D%B4%EC%96%B4%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EB%A7%81%ED%81%AC-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)

[https://12ahn22.tistory.com/entry/Quill-%EC%97%90%EB%94%94%ED%84%B0-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0](https://12ahn22.tistory.com/entry/Quill-%EC%97%90%EB%94%94%ED%84%B0-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)

[https://darrengwon.tistory.com/677](https://darrengwon.tistory.com/677)

[https://yhuj79.github.io/Next/221213](https://yhuj79.github.io/Next/221213)

[https://yhuj79.github.io/React/230214](https://yhuj79.github.io/React/230214)