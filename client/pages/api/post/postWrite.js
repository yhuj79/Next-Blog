import prisma from "../../../hooks/prisma";

export default async function ApiPostWrite(req, res) {
  if (req.method === "POST") {
    const { email, title, thumbnail, category, desc, content } = req.body;

    if (title == "" || desc == "" || category == "" || content == "") {
      res.status(422).send();
    } else {
      const post = await prisma.post.create({
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
