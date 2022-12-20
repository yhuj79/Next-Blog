import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function ApiRead(req, res) {
  const session = await getSession({ req });

  if (session) {
    const posting = await prisma.posting.findMany({
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
    res.json(posting);
  } else {
    res.json(null);
  }
}
