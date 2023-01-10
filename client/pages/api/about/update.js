import prisma from "../../../hooks/prisma";
import { getSession } from "next-auth/react";

export default async function ApiUser(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "POST") {
    const { about } = req.body;

    const aboutUpdate = await prisma.user.update({
      where: {
        email: session?.user?.email,
      },
      data: {
        about: about,
      },
    });
    res.json({ ok: true });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
