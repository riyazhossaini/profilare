import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";
import { toInputJson, toNullableInputJson } from "../../common/utils/prisma-json";

const router = Router();

router.post("/", async (req, res) => {
  const body = z.object({ sectionId: z.string(), blockType: z.string(), content: z.any(), settings: z.any().optional() }).parse(req.body);
  const maxOrder = await prisma.block.aggregate({ where: { sectionId: body.sectionId }, _max: { orderIndex: true } });
  const block = await prisma.block.create({
    data: {
      sectionId: body.sectionId,
      blockType: body.blockType,
      content: toInputJson(body.content),
      settings: toNullableInputJson(body.settings),
      orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
    },
  });
  res.status(201).json({ success: true, data: block });
});

router.patch("/:id", async (req, res) => {
  const data = z.object({ content: z.any().optional(), settings: z.any().optional(), blockType: z.string().optional() }).parse(req.body);
  const block = await prisma.block.update({
    where: { id: req.params.id },
    data: {
      ...(data.blockType !== undefined ? { blockType: data.blockType } : {}),
      ...(data.content !== undefined ? { content: toInputJson(data.content) } : {}),
      ...(data.settings !== undefined ? { settings: toNullableInputJson(data.settings) } : {}),
    },
  });
  res.json({ success: true, data: block });
});

router.post("/reorder", async (req, res) => {
  const body = z.object({ sectionId: z.string(), orderedBlockIds: z.array(z.string()) }).parse(req.body);
  await prisma.$transaction(body.orderedBlockIds.map((id, index) => prisma.block.updateMany({ where: { id, sectionId: body.sectionId }, data: { orderIndex: index } })));
  res.json({ success: true });
});

router.post("/:id/duplicate", async (req, res) => {
  const source = await prisma.block.findUnique({ where: { id: req.params.id } });
  if (!source) {
    res.status(404).json({ success: false, message: "Block not found" });
    return;
  }

  const maxOrder = await prisma.block.aggregate({ where: { sectionId: source.sectionId }, _max: { orderIndex: true } });
  const clone = await prisma.block.create({
    data: {
      sectionId: source.sectionId,
      blockType: source.blockType,
      content: toInputJson(source.content),
      settings: toNullableInputJson(source.settings),
      orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
    },
  });

  res.status(201).json({ success: true, data: clone });
});

router.delete("/:id", async (req, res) => {
  await prisma.block.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export const blocksRouter = router;
