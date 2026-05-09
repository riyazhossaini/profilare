import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";

const router = Router();

router.post("/grant", async (req, res) => {
  const body = z.object({ userId: z.string(), profileId: z.string(), role: z.enum(["owner", "editor", "viewer", "admin"]) }).parse(req.body);
  const permission = await prisma.collaboration.upsert({
    where: { userId_profileId: { userId: body.userId, profileId: body.profileId } },
    update: { role: body.role },
    create: body,
  });
  res.json({ success: true, data: permission });
});

router.delete("/revoke", async (req, res) => {
  const body = z.object({ userId: z.string(), profileId: z.string() }).parse(req.body);
  await prisma.collaboration.delete({ where: { userId_profileId: body } });
  res.json({ success: true });
});

export const permissionsRouter = router;
