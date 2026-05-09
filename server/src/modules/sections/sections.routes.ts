import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";
import { toInputJson, toNullableInputJson } from "../../common/utils/prisma-json";

const router = Router();

router.post("/", async (req, res) => {
  const body = z.object({ pageId: z.string(), title: z.string(), type: z.string(), layout: z.string().optional() }).parse(req.body);
  const maxOrder = await prisma.section.aggregate({ where: { pageId: body.pageId }, _max: { orderIndex: true } });
  const section = await prisma.section.create({
    data: {
      pageId: body.pageId,
      title: body.title,
      type: body.type,
      layout: body.layout ?? "default",
      orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
    },
  });
  res.status(201).json({ success: true, data: section });
});

router.patch("/:id", async (req, res) => {
  const data = z.object({ title: z.string().optional(), description: z.string().optional(), layout: z.string().optional(), styleConfig: z.any().optional(), visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional() }).parse(req.body);
  const section = await prisma.section.update({ where: { id: req.params.id }, data });
  res.json({ success: true, data: section });
});

router.post("/reorder", async (req, res) => {
  const body = z.object({ pageId: z.string(), orderedSectionIds: z.array(z.string()) }).parse(req.body);
  await prisma.$transaction(body.orderedSectionIds.map((id, index) => prisma.section.updateMany({ where: { id, pageId: body.pageId }, data: { orderIndex: index } })));
  res.json({ success: true });
});

router.post("/:id/duplicate", async (req, res) => {
  const source = await prisma.section.findUnique({ where: { id: req.params.id }, include: { blocks: true } });
  if (!source) {
    res.status(404).json({ success: false, message: "Section not found" });
    return;
  }

  const maxOrder = await prisma.section.aggregate({ where: { pageId: source.pageId }, _max: { orderIndex: true } });
  const clone = await prisma.$transaction(async (tx) => {
    const s = await tx.section.create({
      data: {
        pageId: source.pageId,
        title: `${source.title} Copy`,
        description: source.description,
        type: source.type,
        layout: source.layout,
        visibility: source.visibility,
        styleConfig: toNullableInputJson(source.styleConfig),
        orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
      },
    });

    for (const block of source.blocks) {
      await tx.block.create({
        data: {
          sectionId: s.id,
          blockType: block.blockType,
          content: toInputJson(block.content),
          settings: toNullableInputJson(block.settings),
          orderIndex: block.orderIndex,
        },
      });
    }

    return s;
  });

  res.status(201).json({ success: true, data: clone });
});

router.delete("/:id", async (req, res) => {
  await prisma.section.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export const sectionsRouter = router;
