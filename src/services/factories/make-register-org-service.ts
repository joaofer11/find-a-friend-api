import { RegisterOrgService } from '../register-org-service';
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository';

export const makeRegisterOrgService = () =>
  new RegisterOrgService({
    orgRepository: new PrismaOrgRepository(),
  });
