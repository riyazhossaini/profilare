import { Router } from "express";

const router = Router();

router.post("/generate", async (req, res) => {
  res.json({
    success: true,
    message: "AI layer placeholder ready. Connect OpenAI/Anthropic provider in ai service.",
    request: req.body,
  });
});

export const aiRouter = router;
