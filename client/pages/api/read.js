import prisma from "../../lib/prisma";

export default async function ApiRead(req, res) {
  const posting = await prisma.posting.findMany();
  res.json(posting);
}
