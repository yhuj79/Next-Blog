import prisma from "../../../../hooks/prisma";

export default async function ApiSearch(req, res) {
  const email = req.query.email;
  const input = req.query.input;

  function sortDate(list) {
    const sorted_list = list
      .sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reverse();
    return sorted_list;
  }

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
