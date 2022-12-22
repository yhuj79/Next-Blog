import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function ApiRead(req, res) {
  const session = await getSession({ req });

  if (session) {
    const post = await prisma.post.findMany({
      where: {
        author: { email: session.user.email },
        published: false,
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
    res.json(post);
  } else {
    res.json(null);
  }
}
