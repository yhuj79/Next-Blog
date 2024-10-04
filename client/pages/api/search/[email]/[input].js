import prisma from "../../../../lib/prisma";
import { sortDate } from "../../../../utils/sortDate";

export default async function ApiSearch(req, res) {
  const email = req.query.email;
  const input = req.query.input;

  if (req.method === "GET") {
    const post = await prisma.post.findMany({
      where: {
        email: `${email}@gmail.com`,
        title: {
          contains: input,
        },
      },
    });
    if (post.length > 0) {
      res.status(200).json(sortDate(post));
    } else {
      res.status(404).send();
    }
  } else {
    res.status(405).send();
  }
}
