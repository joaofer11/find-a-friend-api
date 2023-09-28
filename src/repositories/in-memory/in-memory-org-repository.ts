import { randomUUID } from 'node:crypto';
import { Org, Prisma } from '@prisma/client';
import { IOrgRepository } from '../interface-org-repository';

export class InMemoryOrgRepository implements IOrgRepository {
  items: Org[] = [];

  async add(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      email: data.email,
      passwordHash: data.passwordHash,
      state: data.state,
      city: data.city,
      address: data.address,
      postalCode: data.postalCode,
      whatsAppNumber: data.whatsAppNumber,
    };

    this.items.push(org);

    return org;
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) ?? null;
  }
}
