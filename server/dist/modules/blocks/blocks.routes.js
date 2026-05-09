"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocksRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const prisma_json_1 = require("../../common/utils/prisma-json");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const body = zod_1.z.object({ sectionId: zod_1.z.string(), blockType: zod_1.z.string(), content: zod_1.z.any(), settings: zod_1.z.any().optional() }).parse(req.body);
    const maxOrder = await prisma_1.prisma.block.aggregate({ where: { sectionId: body.sectionId }, _max: { orderIndex: true } });
    const block = await prisma_1.prisma.block.create({
        data: {
            sectionId: body.sectionId,
            blockType: body.blockType,
            content: (0, prisma_json_1.toInputJson)(body.content),
            settings: (0, prisma_json_1.toNullableInputJson)(body.settings),
            orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
        },
    });
    res.status(201).json({ success: true, data: block });
});
router.patch("/:id", async (req, res) => {
    const data = zod_1.z.object({ content: zod_1.z.any().optional(), settings: zod_1.z.any().optional(), blockType: zod_1.z.string().optional() }).parse(req.body);
    const block = await prisma_1.prisma.block.update({
        where: { id: req.params.id },
        data: {
            ...(data.blockType !== undefined ? { blockType: data.blockType } : {}),
            ...(data.content !== undefined ? { content: (0, prisma_json_1.toInputJson)(data.content) } : {}),
            ...(data.settings !== undefined ? { settings: (0, prisma_json_1.toNullableInputJson)(data.settings) } : {}),
        },
    });
    res.json({ success: true, data: block });
});
router.post("/reorder", async (req, res) => {
    const body = zod_1.z.object({ sectionId: zod_1.z.string(), orderedBlockIds: zod_1.z.array(zod_1.z.string()) }).parse(req.body);
    await prisma_1.prisma.$transaction(body.orderedBlockIds.map((id, index) => prisma_1.prisma.block.updateMany({ where: { id, sectionId: body.sectionId }, data: { orderIndex: index } })));
    res.json({ success: true });
});
router.post("/:id/duplicate", async (req, res) => {
    const source = await prisma_1.prisma.block.findUnique({ where: { id: req.params.id } });
    if (!source) {
        res.status(404).json({ success: false, message: "Block not found" });
        return;
    }
    const maxOrder = await prisma_1.prisma.block.aggregate({ where: { sectionId: source.sectionId }, _max: { orderIndex: true } });
    const clone = await prisma_1.prisma.block.create({
        data: {
            sectionId: source.sectionId,
            blockType: source.blockType,
            content: (0, prisma_json_1.toInputJson)(source.content),
            settings: (0, prisma_json_1.toNullableInputJson)(source.settings),
            orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
        },
    });
    res.status(201).json({ success: true, data: clone });
});
router.delete("/:id", async (req, res) => {
    await prisma_1.prisma.block.delete({ where: { id: req.params.id } });
    res.json({ success: true });
});
exports.blocksRouter = router;
