import prisma from "../../../../hooks/prisma";

export default async function ApiPostEdit(req, res) {
  if (req.method === "POST") {
    const id = req.query.id;
    const { email, title, thumbnail, category, desc, content } = req.body;

    const updatePost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        thumbnail: thumbnail,
        category: category,
        desc: desc,
        content: content,
        email: email,
      },
    });
    res.json({ ok: true });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
