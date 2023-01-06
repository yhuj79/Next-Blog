import prisma from "../../../lib/prisma";

export default async function ApiRead(req, res) {
  const { email } = req.query;

  const user = await prisma.user.findMany({
    where: {
      email: `${email}@gmail.com`,
    },
  });
  res.json(user);
}
