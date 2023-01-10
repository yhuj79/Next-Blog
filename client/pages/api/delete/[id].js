import prisma from "../../../hooks/prisma";
import { getSession } from "next-auth/react";

export default async function ApiDelete(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "DELETE") {
    const id = req.query.id;
    
    const deletePost = await prisma.post.deleteMany({
      where: {
        AND: [
          {
            id: Number(id),
          },
          {
            author: { email: session?.user?.email },
          },
        ],
      },
    });
    res.status(200).json({ deletePost });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
