import prisma from "../../../lib/prisma";

export default async function ApiAboutEdit(req, res) {
  if (req.method === "POST") {
    const { email, about } = req.body;

    const aboutUpdate = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        about: about,
      },
    });
    res.status(200).json({ ok: true });
  } else {
    res.status(405).send();
  }
}
