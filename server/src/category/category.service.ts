import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.categories.findMany();
  }

  async getChildCategories() {
    return this.prisma.categories.findMany({
      where: {
        parentId: { not: null },
        OR: [{ isGroup: false }, { isGroup: null }],
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
