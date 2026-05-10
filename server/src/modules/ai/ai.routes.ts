import { Router } from "express";
import { z } from "zod";
import type { AuthRequest } from "../../common/middleware/authenticate";
import { generateAiContent } from "./ai.service";

const router = Router();

const generateSchema = z.object({
  feature: z.string().min(2).max(80),
  profileId: z.string().optional(),
  input: z.record(z.unknown()),
});

router.post("/generate", async (req: AuthRequest, res) => {
  const body = generateSchema.parse(req.body);
  const output = await generateAiContent({
    feature: body.feature,
    input: body.input,
    userId: req.auth?.userId,
    profileId: body.profileId,
  });

  res.json({ success: true, output });
});

export const aiRouter = router;
