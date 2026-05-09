import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { prisma } from "../../common/prisma";

const router = Router();
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } });

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: "File is required" });
    return;
  }

  const userId = z.string().parse(req.body.userId);

  const media = await prisma.media.create({
    data: {
      userId,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      fileUrl: `https://cdn.profilare.local/${Date.now()}-${req.file.originalname}`,
      metadata: { uploadedAt: new Date().toISOString() },
    },
  });

  res.status(201).json({ success: true, data: media });
});

router.delete("/:id", async (req, res) => {
  await prisma.media.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export const mediaRouter = router;
