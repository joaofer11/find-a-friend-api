import { Org, Prisma } from '@prisma/client';

export interface IOrgRepository {
  findById(id: string): Promise<Org | null>;
  add(data: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
