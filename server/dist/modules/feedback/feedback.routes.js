"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const router = (0, express_1.Router)();
const createSchema = zod_1.z.object({
    tryingToDo: zod_1.z.string().min(3).max(1200),
    issue: zod_1.z.string().min(3).max(3000),
    priority: zod_1.z.enum(["low", "medium", "high"]).default("medium"),
    contact: zod_1.z.string().max(200).optional(),
    page: zod_1.z.string().max(500).optional(),
    userAgent: zod_1.z.string().max(1000).optional(),
});
router.post("/", async (req, res) => {
    const body = createSchema.parse(req.body);
    const event = await prisma_1.prisma.analyticsEvent.create({
        data: {
            userId: req.auth?.userId,
            profileId: undefined,
            eventName: "feedback_submitted",
            payload: {
                tryingToDo: body.tryingToDo,
                issue: body.issue,
                priority: body.priority,
                contact: body.contact || null,
                page: body.page || null,
                userAgent: body.userAgent || null,
            },
        },
    });
    res.status(201).json({ success: true, id: event.id });
});
router.get("/", async (_req, res) => {
    const items = await prisma_1.prisma.analyticsEvent.findMany({
        where: { eventName: "feedback_submitted" },
        orderBy: { createdAt: "desc" },
        take: 200,
    });
    res.json({ success: true, items });
});
exports.feedbackRouter = router;
