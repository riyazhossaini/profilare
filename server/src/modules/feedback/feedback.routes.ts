import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";
import type { AuthRequest } from "../../common/middleware/authenticate";

const router = Router();

const createSchema = z.object({
  tryingToDo: z.string().min(3).max(1200),
  issue: z.string().min(3).max(3000),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  contact: z.string().max(200).optional(),
  page: z.string().max(500).optional(),
  userAgent: z.string().max(1000).optional(),
});

router.post("/", async (req: AuthRequest, res) => {
  const body = createSchema.parse(req.body);
  const event = await prisma.analyticsEvent.create({
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
  const items = await prisma.analyticsEvent.findMany({
    where: { eventName: "feedback_submitted" },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  res.json({ success: true, items });
});

export const feedbackRouter = router;

