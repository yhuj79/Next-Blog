import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function ApiPost(req, res) {
  const session = await getSession({ req });
  const { title, category, content } = req.body;

  if (session) {
    const post = await prisma.post.create({
      data: {
        title: title,
        category: category,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json({ ok: true });
  }
}
