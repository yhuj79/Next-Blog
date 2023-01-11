import prisma from "../../../hooks/prisma";

export default async function ApiPostWrite(req, res) {
  if (req.method === "POST") {
    const { email, title, category, desc, content } = req.body;

    const post = await prisma.post.create({
      data: {
        title: title,
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
