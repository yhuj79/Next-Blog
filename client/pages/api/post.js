import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function ApiPost(req, res) {
  const session = await getSession({ req });

  if (session) {
    const posting = await prisma.posting.create({
      data: {
        title: "Fourth Post",
        category: "React",
        content: "Next JS 네번째 포스트 입니다.",
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json({ ok: true });
  }
}
