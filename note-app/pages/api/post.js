import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ApiPost(req, res) {
  const posting = await prisma.posting.create({
    data: {
      title: "api post test 555",
      content: "api post test 555",
    },
  });
  res.json({ ok: true });
}
