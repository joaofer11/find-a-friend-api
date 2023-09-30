import { prisma } from '@/db/prisma';
import { Prisma } from '@prisma/client';
import { IOrgRepository } from '../interface-org-repository';

export class PrismaOrgRepository implements IOrgRepository {
  async add(data: Prisma.OrgCreateInput) {
    return await prisma.org.create({
      data,
    });
  }

  async findById(id: string) {
    return await prisma.org.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await prisma.org.findUnique({ where: { email } });
  }
}
