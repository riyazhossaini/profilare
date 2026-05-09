"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilesRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const router = (0, express_1.Router)();
router.get("/:slug", async (req, res) => {
    const profile = await prisma_1.prisma.profile.findUnique({
        where: { slug: req.params.slug },
        include: {
            pages: { include: { sections: { include: { blocks: true }, orderBy: { orderIndex: "asc" } } }, orderBy: { orderIndex: "asc" } },
            socialLinks: true,
        },
    });
    if (!profile) {
        res.status(404).json({ success: false, message: "Profile not found" });
        return;
    }
    res.json({ success: true, data: profile });
});
router.post("/", async (req, res) => {
    const body = zod_1.z.object({ userId: zod_1.z.string(), displayName: zod_1.z.string(), slug: zod_1.z.string() }).parse(req.body);
    const profile = await prisma_1.prisma.profile.create({ data: body });
    res.status(201).json({ success: true, data: profile });
});
router.patch("/:id", async (req, res) => {
    const data = zod_1.z.object({ displayName: zod_1.z.string().optional(), headline: zod_1.z.string().optional(), shortBio: zod_1.z.string().optional(), location: zod_1.z.string().optional(), website: zod_1.z.string().optional(), visibility: zod_1.z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional(), themeId: zod_1.z.string().nullable().optional() }).parse(req.body);
    const profile = await prisma_1.prisma.profile.update({ where: { id: req.params.id }, data });
    res.json({ success: true, data: profile });
});
router.post("/:id/publish", async (req, res) => {
    await prisma_1.prisma.page.updateMany({ where: { profileId: req.params.id }, data: { isPublished: true } });
    res.json({ success: true });
});
exports.profilesRouter = router;
