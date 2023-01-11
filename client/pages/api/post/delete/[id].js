import prisma from "../../../../hooks/prisma";

export default async function ApiPostDelete(req, res) {
  if (req.method === "DELETE") {
    const id = req.query.id;

    const deletePost = await prisma.post.deleteMany({
      where: { id: Number(id) },
    });
    res.status(200).json({ deletePost });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
