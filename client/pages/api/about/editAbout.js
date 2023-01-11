import prisma from "../../../hooks/prisma";

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
    res.json({ ok: true });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
