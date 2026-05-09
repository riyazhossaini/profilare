import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";
import { toInputJson } from "../../common/utils/prisma-json";

const router = Router();

router.post("/autosave", async (req, res) => {
  const body = z.object({ profileId: z.string(), entityType: z.string(), entityId: z.string(), data: z.any(), updatedById: z.string().optional() }).parse(req.body);
  const draft = await prisma.draft.upsert({
    where: { profileId_entityType_entityId: { profileId: body.profileId, entityType: body.entityType, entityId: body.entityId } },
    update: { data: toInputJson(body.data), updatedById: body.updatedById },
    create: {
      profileId: body.profileId,
      entityType: body.entityType,
      entityId: body.entityId,
      data: toInputJson(body.data),
      updatedById: body.updatedById,
    },
  });
  res.json({ success: true, data: draft });
});

router.post("/snapshot", async (req, res) => {
  const body = z.object({ profileId: z.string(), entityType: z.enum(["PROFILE", "PAGE", "SECTION", "BLOCK", "THEME"]), entityId: z.string(), snapshotData: z.any() }).parse(req.body);
  const latest = await prisma.versionHistory.aggregate({ where: { profileId: body.profileId, entityType: body.entityType, entityId: body.entityId }, _max: { versionNumber: true } });
  const version = await prisma.versionHistory.create({
    data: {
      profileId: body.profileId,
      entityType: body.entityType,
      entityId: body.entityId,
      snapshotData: toInputJson(body.snapshotData),
      versionNumber: (latest._max.versionNumber ?? 0) + 1,
    },
  });
  res.status(201).json({ success: true, data: version });
});

router.get("/:profileId", async (req, res) => {
  const drafts = await prisma.draft.findMany({ where: { profileId: req.params.profileId }, orderBy: { updatedAt: "desc" } });
  res.json({ success: true, data: drafts });
});

export const draftsRouter = router;
