import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";

const router = Router();

router.post("/track", async (req, res) => {
  const body = z.object({ profileId: z.string(), eventName: z.string(), payload: z.any().optional(), userId: z.string().optional() }).parse(req.body);
  await prisma.analyticsEvent.create({ data: body });
  res.status(201).json({ success: true });
});

router.get("/:profileId", async (req, res) => {
  const [daily, events] = await Promise.all([
    prisma.analyticsDaily.findMany({ where: { profileId: req.params.profileId }, orderBy: { day: "desc" }, take: 30 }),
    prisma.analyticsEvent.findMany({ where: { profileId: req.params.profileId }, orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  res.json({ success: true, data: { daily, events } });
});

export const analyticsRouter = router;
