import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const posting = await prisma.posting.findMany();
  res.json(posting);
}
