"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const router = (0, express_1.Router)();
router.post("/grant", async (req, res) => {
    const body = zod_1.z.object({ userId: zod_1.z.string(), profileId: zod_1.z.string(), role: zod_1.z.enum(["owner", "editor", "viewer", "admin"]) }).parse(req.body);
    const permission = await prisma_1.prisma.collaboration.upsert({
        where: { userId_profileId: { userId: body.userId, profileId: body.profileId } },
        update: { role: body.role },
        create: body,
    });
    res.json({ success: true, data: permission });
});
router.delete("/revoke", async (req, res) => {
    const body = zod_1.z.object({ userId: zod_1.z.string(), profileId: zod_1.z.string() }).parse(req.body);
    await prisma_1.prisma.collaboration.delete({ where: { userId_profileId: body } });
    res.json({ success: true });
});
exports.permissionsRouter = router;
