"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionsRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const prisma_json_1 = require("../../common/utils/prisma-json");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const body = zod_1.z.object({ pageId: zod_1.z.string(), title: zod_1.z.string(), type: zod_1.z.string(), layout: zod_1.z.string().optional() }).parse(req.body);
    const maxOrder = await prisma_1.prisma.section.aggregate({ where: { pageId: body.pageId }, _max: { orderIndex: true } });
    const section = await prisma_1.prisma.section.create({
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
    const data = zod_1.z.object({ title: zod_1.z.string().optional(), description: zod_1.z.string().optional(), layout: zod_1.z.string().optional(), styleConfig: zod_1.z.any().optional(), visibility: zod_1.z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional() }).parse(req.body);
    const section = await prisma_1.prisma.section.update({ where: { id: req.params.id }, data });
    res.json({ success: true, data: section });
});
router.post("/reorder", async (req, res) => {
    const body = zod_1.z.object({ pageId: zod_1.z.string(), orderedSectionIds: zod_1.z.array(zod_1.z.string()) }).parse(req.body);
    await prisma_1.prisma.$transaction(body.orderedSectionIds.map((id, index) => prisma_1.prisma.section.updateMany({ where: { id, pageId: body.pageId }, data: { orderIndex: index } })));
    res.json({ success: true });
});
router.post("/:id/duplicate", async (req, res) => {
    const source = await prisma_1.prisma.section.findUnique({ where: { id: req.params.id }, include: { blocks: true } });
    if (!source) {
        res.status(404).json({ success: false, message: "Section not found" });
        return;
    }
    const maxOrder = await prisma_1.prisma.section.aggregate({ where: { pageId: source.pageId }, _max: { orderIndex: true } });
    const clone = await prisma_1.prisma.$transaction(async (tx) => {
        const s = await tx.section.create({
            data: {
                pageId: source.pageId,
                title: `${source.title} Copy`,
                description: source.description,
                type: source.type,
                layout: source.layout,
                visibility: source.visibility,
                styleConfig: (0, prisma_json_1.toNullableInputJson)(source.styleConfig),
                orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
            },
        });
        for (const block of source.blocks) {
            await tx.block.create({
                data: {
                    sectionId: s.id,
                    blockType: block.blockType,
                    content: (0, prisma_json_1.toInputJson)(block.content),
                    settings: (0, prisma_json_1.toNullableInputJson)(block.settings),
                    orderIndex: block.orderIndex,
                },
            });
        }
        return s;
    });
    res.status(201).json({ success: true, data: clone });
});
router.delete("/:id", async (req, res) => {
    await prisma_1.prisma.section.delete({ where: { id: req.params.id } });
    res.json({ success: true });
});
exports.sectionsRouter = router;
