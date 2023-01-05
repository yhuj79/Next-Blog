import prisma from "../../../../../lib/prisma";

export default async function ApiRead(req, res) {
  const { email, title } = req.query;

  const post = await prisma.post.findMany({
    where: {
      author: { email: `${email}@gmail.com` },
      title: title,
      published: false,
    },
    include: {
      author: {
        select: { email: true },
      },
    },
  });
  res.json(post);
}
