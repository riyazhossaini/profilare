import { prisma } from "../../common/prisma";
import { slugify } from "../../common/utils/slugify";
import { toInputJson, toNullableInputJson } from "../../common/utils/prisma-json";

export class PagesService {
  async createPage(profileId: string, title: string) {
    const maxOrder = await prisma.page.aggregate({ where: { profileId }, _max: { orderIndex: true } });
    const orderIndex = (maxOrder._max.orderIndex ?? -1) + 1;

    return prisma.page.create({
      data: {
        profileId,
        title,
        slug: slugify(title),
        orderIndex,
      },
    });
  }

  async reorderPages(profileId: string, pageIdsInOrder: string[]) {
    await prisma.$transaction(
      pageIdsInOrder.map((id, index) =>
        prisma.page.updateMany({
          where: { id, profileId },
          data: { orderIndex: index },
        })
      )
    );
  }

  async duplicatePage(pageId: string) {
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      include: { sections: { include: { blocks: true }, orderBy: { orderIndex: "asc" } } },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    return prisma.$transaction(async (tx) => {
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
            styleConfig: toNullableInputJson(section.styleConfig),
            orderIndex: section.orderIndex,
          },
        });

        for (const block of section.blocks) {
          await tx.block.create({
            data: {
              sectionId: sectionClone.id,
              blockType: block.blockType,
              content: toInputJson(block.content),
              settings: toNullableInputJson(block.settings),
              orderIndex: block.orderIndex,
            },
          });
        }
      }

      return clone;
    });
  }
}

export const pagesService = new PagesService();
