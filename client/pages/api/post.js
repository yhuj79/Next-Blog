import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ApiPost(req, res) {
  const posting = await prisma.posting.create({
    data: {
      title: "First Post",
      content: "Next JS 첫번째 포스트 입니다.",
    },
  });
  res.json({ ok: true });
}
