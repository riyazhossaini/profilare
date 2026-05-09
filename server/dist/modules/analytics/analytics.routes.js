"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const router = (0, express_1.Router)();
router.post("/track", async (req, res) => {
    const body = zod_1.z.object({ profileId: zod_1.z.string(), eventName: zod_1.z.string(), payload: zod_1.z.any().optional(), userId: zod_1.z.string().optional() }).parse(req.body);
    await prisma_1.prisma.analyticsEvent.create({ data: body });
    res.status(201).json({ success: true });
});
router.get("/:profileId", async (req, res) => {
    const [daily, events] = await Promise.all([
        prisma_1.prisma.analyticsDaily.findMany({ where: { profileId: req.params.profileId }, orderBy: { day: "desc" }, take: 30 }),
        prisma_1.prisma.analyticsEvent.findMany({ where: { profileId: req.params.profileId }, orderBy: { createdAt: "desc" }, take: 100 }),
    ]);
    res.json({ success: true, data: { daily, events } });
});
exports.analyticsRouter = router;
