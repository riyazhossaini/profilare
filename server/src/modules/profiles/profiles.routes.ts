import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";

const router = Router();

router.get("/:slug", async (req, res) => {
  const profile = await prisma.profile.findUnique({
    where: { slug: req.params.slug },
    include: {
      pages: { include: { sections: { include: { blocks: true }, orderBy: { orderIndex: "asc" } } }, orderBy: { orderIndex: "asc" } },
      socialLinks: true,
    },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: "Profile not found" });
    return;
  }

  res.json({ success: true, data: profile });
});

router.post("/", async (req, res) => {
  const body = z.object({ userId: z.string(), displayName: z.string(), slug: z.string() }).parse(req.body);
  const profile = await prisma.profile.create({ data: body });
  res.status(201).json({ success: true, data: profile });
});

router.patch("/:id", async (req, res) => {
  const data = z.object({ displayName: z.string().optional(), headline: z.string().optional(), shortBio: z.string().optional(), location: z.string().optional(), website: z.string().optional(), visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional(), themeId: z.string().nullable().optional() }).parse(req.body);
  const profile = await prisma.profile.update({ where: { id: req.params.id }, data });
  res.json({ success: true, data: profile });
});

router.post("/:id/publish", async (req, res) => {
  await prisma.page.updateMany({ where: { profileId: req.params.id }, data: { isPublished: true } });
  res.json({ success: true });
});

export const profilesRouter = router;
