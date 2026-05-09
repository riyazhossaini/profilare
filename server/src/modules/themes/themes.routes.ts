import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../common/prisma";

const router = Router();

router.post("/", async (req, res) => {
  const body = z.object({ userId: z.string(), name: z.string(), colors: z.any().optional(), fonts: z.any().optional(), spacing: z.any().optional(), borderRadius: z.any().optional(), shadows: z.any().optional(), animations: z.any().optional(), layoutSettings: z.any().optional(), customCSS: z.string().optional() }).parse(req.body);
  const theme = await prisma.theme.create({ data: body });
  res.status(201).json({ success: true, data: theme });
});

router.patch("/:id", async (req, res) => {
  const data = z.object({ name: z.string().optional(), colors: z.any().optional(), fonts: z.any().optional(), spacing: z.any().optional(), borderRadius: z.any().optional(), shadows: z.any().optional(), animations: z.any().optional(), layoutSettings: z.any().optional(), customCSS: z.string().optional() }).parse(req.body);
  const theme = await prisma.theme.update({ where: { id: req.params.id }, data });
  res.json({ success: true, data: theme });
});

export const themesRouter = router;
