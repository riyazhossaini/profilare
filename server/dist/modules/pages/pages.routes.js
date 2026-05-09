"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagesRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const pages_service_1 = require("./pages.service");
const slugify_1 = require("../../common/utils/slugify");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const body = zod_1.z.object({ profileId: zod_1.z.string(), title: zod_1.z.string().min(1) }).parse(req.body);
    const page = await pages_service_1.pagesService.createPage(body.profileId, body.title);
    res.status(201).json({ success: true, data: page });
});
router.patch("/:id", async (req, res) => {
    const body = zod_1.z
        .object({
        title: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().optional(),
        layoutType: zod_1.z.string().optional(),
        visibility: zod_1.z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional(),
        isPublished: zod_1.z.boolean().optional(),
    })
        .parse(req.body);
    const data = { ...body };
    if (body.title) {
        data.slug = (0, slugify_1.slugify)(body.title);
    }
    const page = await prisma_1.prisma.page.update({ where: { id: req.params.id }, data });
    res.json({ success: true, data: page });
});
router.post("/:id/duplicate", async (req, res) => {
    const page = await pages_service_1.pagesService.duplicatePage(req.params.id);
    res.status(201).json({ success: true, data: page });
});
router.post("/reorder", async (req, res) => {
    const body = zod_1.z.object({ profileId: zod_1.z.string(), orderedPageIds: zod_1.z.array(zod_1.z.string()) }).parse(req.body);
    await pages_service_1.pagesService.reorderPages(body.profileId, body.orderedPageIds);
    res.json({ success: true });
});
router.get("/slug/:profileSlug/:pageSlug", async (req, res) => {
    const page = await prisma_1.prisma.page.findFirst({
        where: { slug: req.params.pageSlug, profile: { slug: req.params.profileSlug } },
        include: { sections: { include: { blocks: true }, orderBy: { orderIndex: "asc" } } },
    });
    if (!page) {
        res.status(404).json({ success: false, message: "Page not found" });
        return;
    }
    res.json({ success: true, data: page });
});
router.delete("/:id", async (req, res) => {
    await prisma_1.prisma.page.delete({ where: { id: req.params.id } });
    res.json({ success: true });
});
exports.pagesRouter = router;
