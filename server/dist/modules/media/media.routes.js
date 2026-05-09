"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ limits: { fileSize: 50 * 1024 * 1024 } });
router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ success: false, message: "File is required" });
        return;
    }
    const userId = zod_1.z.string().parse(req.body.userId);
    const media = await prisma_1.prisma.media.create({
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
    await prisma_1.prisma.media.delete({ where: { id: req.params.id } });
    res.json({ success: true });
});
exports.mediaRouter = router;
