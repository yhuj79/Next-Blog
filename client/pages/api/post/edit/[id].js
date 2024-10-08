import prisma from "../../../../lib/prisma";

export default async function ApiPostEdit(req, res) {
  if (req.method === "POST") {
    const id = req.query.id;
    const { email, title, thumbnail, category, desc, content } = req.body;

    if (title == "" || desc == "" || category == "" || content == "") {
      res.status(422).send();
    } else {
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
      res.status(200).json({ ok: true });
    }
  } else {
    res.status(405).send();
  }
}
