import prisma from "../../lib/prisma";

// TEST /api/account
export default async function ApiReadAccount(req, res) {
  const account = await prisma.account.findMany();
  res.json(account);
}

// account :  [
//     {
//          "id": "clbqnij7d0003g6a4doti4gb4",
//          "userId": "clbqniiyj0000g6a4g99xealg",
//          "type": "oauth",
//          "provider": "google",
//          "providerAccountId": "103555286507776103569",
//          "refresh_token": null,
//          "access_token": "ya29.a0AX9GBdXBOrw8-3gkXIcJ36K3vmYXU30I32L6gSh9LFfae2lB4lq2e_X9ehSLRe3hj6CmO-7ImCodz3WnIbxta1SlZe5OKbKzpP8rnyCQJgL79bRq_3CLiPG51ekltBPtBy83hh5iHwrKBjlohWX3lqGy5fhUaCgYKAZISARISFQHUCsbC9lqBLTwLbwJeQNV2PeDR1Q0163",
//          "expires_at": 1671207266,
//          "token_type": "Bearer",
//          "scope": "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
//          "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhjMjdkYjRkMTNmNTRlNjU3ZDI2NWI0NTExMDA4MGI0ODhlYjQzOGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMTQ2OTE5MDg1OTAtc3QyY3VmczlxbXQ2NnQ3NGo4ZmRsczM0bXE5aWNlNXAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMTQ2OTE5MDg1OTAtc3QyY3VmczlxbXQ2NnQ3NGo4ZmRsczM0bXE5aWNlNXAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM1NTUyODY1MDc3NzYxMDM1NjkiLCJlbWFpbCI6Inl1MTA4NTY5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVnFFY2NGWjRaNmhZZU9ZY08wQVpCZyIsIm5hbWUiOiJISiBZIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDVvVXBjdEQ3Y242Ykl6RzhZTXpiQ0U1UFFSS2tBR0VvdGxJcnZHYWc9czk2LWMiLCJnaXZlbl9uYW1lIjoiSEoiLCJmYW1pbHlfbmFtZSI6IlkiLCJsb2NhbGUiOiJrbyIsImlhdCI6MTY3MTIwMzY2NywiZXhwIjoxNjcxMjA3MjY3fQ.ZgvLcjIC9dJRYpMT05_N68HVjBLRweAznLTVzD5Mvgq_YWVLst-wezj5QuyIjp73Em4odEU19UL7QfMSojJzXWz1AOgn_bT20oOPtxACFWWboMXC3oq6GxzRRmF1tVVcNmyXjG2X-sjUmiyM8iAErffJN4GtsfKWiFiXFpQ6FurhG9O1T5GuyltUOe7h1_y8LDLsvGzyZR0yOuejzb7IUI0TPPenAOIT4o7_i9VZVUqKhButPQ9lUbPsbsgD6WXigPzlXHSdUlvgSnkiKVbSPO-mCNF7XoACiIK69j9soYVzDMdFuN_znqZN944X-gOalfm36LAT0ejiFph1oeKC8A",
//          "session_state": null
//     },
//     {
//          "id": "clbqo928g0006g6a4f6yo6p5d",
//          "userId": "clbqo91zw0004g6a4zgmsavob",
//          "type": "oauth",
//          "provider": "google",
//          "providerAccountId": "111514548848698952456",
//          "refresh_token": null,
//          "access_token": "ya29.a0AX9GBdXE-v6o0M-up5pRBPl54hT8WzmhXqyTe1sU4ZBctw4_socspvn4hbKB3A49KXdvsTfvjPwWFm-VVe-VM4VFIRei15S7UUJLUjQsRnhjeD_GIMU0srFNDMCSnzdoQtjdKIhHSY6EP2cchvuTtlTE3dZHaCgYKAc0SARISFQHUCsbCZVBHgMWAeEeYgX7TrTsJHA0163",
//          "expires_at": 1671208504,
//          "token_type": "Bearer",
//          "scope": "https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile",
//          "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhjMjdkYjRkMTNmNTRlNjU3ZDI2NWI0NTExMDA4MGI0ODhlYjQzOGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMTQ2OTE5MDg1OTAtc3QyY3VmczlxbXQ2NnQ3NGo4ZmRsczM0bXE5aWNlNXAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMTQ2OTE5MDg1OTAtc3QyY3VmczlxbXQ2NnQ3NGo4ZmRsczM0bXE5aWNlNXAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE1MTQ1NDg4NDg2OTg5NTI0NTYiLCJlbWFpbCI6Imh3YW5qdXl1MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkxEemg0Z2wwc0VOblR1QlJzVHNvV2ciLCJuYW1lIjoi7Jyg7ZmY7KO8IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDdZTlB6OXhFbEpsS0wtMC1VU1dIU3pPRGUtYXFPUWwwRHA3MThtPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Iu2ZmOyjvCIsImZhbWlseV9uYW1lIjoi7JygIiwibG9jYWxlIjoia28iLCJpYXQiOjE2NzEyMDQ5MDQsImV4cCI6MTY3MTIwODUwNH0.cOA1C0-2a0ae1ITwn8vnNZB5KN-29LBLB0SF8SHoGQ0YHzuPbMkicdjlNb-r4aksnQlbSBH5W4pq026OV_1c4v3-gKfGLl5t0FOcC8-uoNMcLETG0wxBcB56gWYewC0mDew8MnVQ8T2Vg6ND6pw3Wr-FZK58lvNHABMSJ1FVv3A9v-MWGF18GkbGUssR4wPOzn5HtWQy3GaSsqAsQCYUDXeEOiZm8Y0JnY917EZzcJe7B4MtghSUP0kzBMOX9edzE6WtVojPxGcfRRwGIXh3aP0-QmqvivTKOTGuGPHhB1ZnI6O1B45LLl-v-ufFc_34VQaw5gIHcsRf1xFt5O-jdA",
//          "session_state": null
//     }
// ]
