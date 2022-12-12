import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ApiPost(req, res) {
  const posting = await prisma.posting.create({
    data: {
      title: "six title!!",
      content: "6api6 6post6 6test6",
    },
  });
  res.json({ ok: true });
}
