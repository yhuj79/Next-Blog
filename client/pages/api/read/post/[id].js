import prisma from "../../../../lib/prisma";

export default async function ApiRead(req, res) {
  const { id } = req.query;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
}
