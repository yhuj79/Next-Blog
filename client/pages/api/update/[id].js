import prisma from "../../../hooks/prisma";
import { getSession } from "next-auth/react";

export default async function ApiUpdate(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "POST") {
    const id = req.query.id;
    const { title, category, desc, content } = req.body;

    const updatePost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        category: category,
        desc: desc,
        content: content,
      },
    });
    res.json({ ok: true });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}