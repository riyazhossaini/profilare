import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";
import { pagesService } from "./pages.service";
import { slugify } from "../../common/utils/slugify";

const router = Router();

router.post("/", async (req, res) => {
  const body = z.object({ profileId: z.string(), title: z.string().min(1) }).parse(req.body);
  const page = await pagesService.createPage(body.profileId, body.title);
  res.status(201).json({ success: true, data: page });
});

router.patch("/:id", async (req, res) => {
  const body = z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      layoutType: z.string().optional(),
      visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional(),
      isPublished: z.boolean().optional(),
    })
    .parse(req.body);

  const data: Record<string, unknown> = { ...body };
  if (body.title) {
    data.slug = slugify(body.title);
  }

  const page = await prisma.page.update({ where: { id: req.params.id }, data });
  res.json({ success: true, data: page });
});

router.post("/:id/duplicate", async (req, res) => {
  const page = await pagesService.duplicatePage(req.params.id);
  res.status(201).json({ success: true, data: page });
});

router.post("/reorder", async (req, res) => {
  const body = z.object({ profileId: z.string(), orderedPageIds: z.array(z.string()) }).parse(req.body);
  await pagesService.reorderPages(body.profileId, body.orderedPageIds);
  res.json({ success: true });
});

router.get("/slug/:profileSlug/:pageSlug", async (req, res) => {
  const page = await prisma.page.findFirst({
    where: { slug: req.params.pageSlug, profile: { slug: req.params.profileSlug } },
    include: { sections: { include: { blocks: true }, orderBy: { orderIndex: "asc" } } },
  });

  if (!page) {
    res.status(404).json({ success: false, message: "Page not found" });
    return;
  }

  res.json({ success: true, data: page });
});

router.delete("/:id", async (req, res) => {
  await prisma.page.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export const pagesRouter = router;
