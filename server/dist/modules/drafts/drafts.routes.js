"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draftsRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const prisma_json_1 = require("../../common/utils/prisma-json");
const router = (0, express_1.Router)();
router.post("/autosave", async (req, res) => {
    const body = zod_1.z.object({ profileId: zod_1.z.string(), entityType: zod_1.z.string(), entityId: zod_1.z.string(), data: zod_1.z.any(), updatedById: zod_1.z.string().optional() }).parse(req.body);
    const draft = await prisma_1.prisma.draft.upsert({
        where: { profileId_entityType_entityId: { profileId: body.profileId, entityType: body.entityType, entityId: body.entityId } },
        update: { data: (0, prisma_json_1.toInputJson)(body.data), updatedById: body.updatedById },
        create: {
            profileId: body.profileId,
            entityType: body.entityType,
            entityId: body.entityId,
            data: (0, prisma_json_1.toInputJson)(body.data),
            updatedById: body.updatedById,
        },
    });
    res.json({ success: true, data: draft });
});
router.post("/snapshot", async (req, res) => {
    const body = zod_1.z.object({ profileId: zod_1.z.string(), entityType: zod_1.z.enum(["PROFILE", "PAGE", "SECTION", "BLOCK", "THEME"]), entityId: zod_1.z.string(), snapshotData: zod_1.z.any() }).parse(req.body);
    const latest = await prisma_1.prisma.versionHistory.aggregate({ where: { profileId: body.profileId, entityType: body.entityType, entityId: body.entityId }, _max: { versionNumber: true } });
    const version = await prisma_1.prisma.versionHistory.create({
        data: {
            profileId: body.profileId,
            entityType: body.entityType,
            entityId: body.entityId,
            snapshotData: (0, prisma_json_1.toInputJson)(body.snapshotData),
            versionNumber: (latest._max.versionNumber ?? 0) + 1,
        },
    });
    res.status(201).json({ success: true, data: version });
});
router.get("/:profileId", async (req, res) => {
    const drafts = await prisma_1.prisma.draft.findMany({ where: { profileId: req.params.profileId }, orderBy: { updatedAt: "desc" } });
    res.json({ success: true, data: drafts });
});
exports.draftsRouter = router;
