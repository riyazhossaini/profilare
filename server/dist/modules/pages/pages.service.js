"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagesService = exports.PagesService = void 0;
const prisma_1 = require("../../common/prisma");
const slugify_1 = require("../../common/utils/slugify");
const prisma_json_1 = require("../../common/utils/prisma-json");
class PagesService {
    async createPage(profileId, title) {
        const maxOrder = await prisma_1.prisma.page.aggregate({ where: { profileId }, _max: { orderIndex: true } });
        const orderIndex = (maxOrder._max.orderIndex ?? -1) + 1;
        return prisma_1.prisma.page.create({
            data: {
                profileId,
                title,
                slug: (0, slugify_1.slugify)(title),
                orderIndex,
            },
        });
    }
    async reorderPages(profileId, pageIdsInOrder) {
        await prisma_1.prisma.$transaction(pageIdsInOrder.map((id, index) => prisma_1.prisma.page.updateMany({
            where: { id, profileId },
            data: { orderIndex: index },
        })));
    }
    async duplicatePage(pageId) {
        const page = await prisma_1.prisma.page.findUnique({
            where: { id: pageId },
            include: { sections: { include: { blocks: true }, orderBy: { orderIndex: "asc" } } },
        });
        if (!page) {
            throw new Error("Page not found");
        }
        return prisma_1.prisma.$transaction(async (tx) => {
            const maxOrder = await tx.page.aggregate({ where: { profileId: page.profileId }, _max: { orderIndex: true } });
            const clone = await tx.page.create({
                data: {
                    profileId: page.profileId,
                    title: `${page.title} Copy`,
                    slug: `${page.slug}-copy-${Date.now()}`,
                    orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
                    layoutType: page.layoutType,
                    description: page.description,
                    visibility: page.visibility,
                },
            });
            for (const section of page.sections) {
                const sectionClone = await tx.section.create({
                    data: {
                        pageId: clone.id,
                        title: section.title,
                        description: section.description,
                        type: section.type,
                        layout: section.layout,
                        visibility: section.visibility,
                        styleConfig: (0, prisma_json_1.toNullableInputJson)(section.styleConfig),
                        orderIndex: section.orderIndex,
                    },
                });
                for (const block of section.blocks) {
                    await tx.block.create({
                        data: {
                            sectionId: sectionClone.id,
                            blockType: block.blockType,
                            content: (0, prisma_json_1.toInputJson)(block.content),
                            settings: (0, prisma_json_1.toNullableInputJson)(block.settings),
                            orderIndex: block.orderIndex,
                        },
                    });
                }
            }
            return clone;
        });
    }
}
exports.PagesService = PagesService;
exports.pagesService = new PagesService();
