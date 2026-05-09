"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themesRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const body = zod_1.z.object({ userId: zod_1.z.string(), name: zod_1.z.string(), colors: zod_1.z.any().optional(), fonts: zod_1.z.any().optional(), spacing: zod_1.z.any().optional(), borderRadius: zod_1.z.any().optional(), shadows: zod_1.z.any().optional(), animations: zod_1.z.any().optional(), layoutSettings: zod_1.z.any().optional(), customCSS: zod_1.z.string().optional() }).parse(req.body);
    const theme = await prisma_1.prisma.theme.create({ data: body });
    res.status(201).json({ success: true, data: theme });
});
router.patch("/:id", async (req, res) => {
    const data = zod_1.z.object({ name: zod_1.z.string().optional(), colors: zod_1.z.any().optional(), fonts: zod_1.z.any().optional(), spacing: zod_1.z.any().optional(), borderRadius: zod_1.z.any().optional(), shadows: zod_1.z.any().optional(), animations: zod_1.z.any().optional(), layoutSettings: zod_1.z.any().optional(), customCSS: zod_1.z.string().optional() }).parse(req.body);
    const theme = await prisma_1.prisma.theme.update({ where: { id: req.params.id }, data });
    res.json({ success: true, data: theme });
});
exports.themesRouter = router;
