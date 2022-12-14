import prisma from "../../hooks/prisma";
import { getSession } from "next-auth/react";

export default async function ApiPost(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "POST") {
    const { title, category, desc, content } = req.body;

    const post = await prisma.post.create({
      data: {
        title: title,
        category: category,
        desc: desc,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json({ ok: true });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
