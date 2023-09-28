import { hash } from 'bcryptjs';
import { Org } from '@prisma/client';
import { IOrgRepository } from '@/repositories/interface-org-repository';
import { OrgEmailAlreadyExistsError } from './errors/org-email-already-exists-error';

interface IRegisterOrgServiceRepositories {
  orgRepository: IOrgRepository;
}

interface IRegisterOrgServiceInput {
  name: string;
  description?: string;
  email: string;
  password: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  whatsAppNumber: string;
}

interface IRegisterOrgServiceOutput {
  org: Org;
}

export class RegisterOrgService {
  #orgRepository: IOrgRepository;

  constructor({ orgRepository }: IRegisterOrgServiceRepositories) {
    this.#orgRepository = orgRepository;
  }

  async execute(
    payload: IRegisterOrgServiceInput
  ): Promise<IRegisterOrgServiceOutput> {
    const existingOrg = await this.#orgRepository.findByEmail(payload.email);

    if (existingOrg) {
      throw new OrgEmailAlreadyExistsError();
    }

    const org = await this.#orgRepository.add({
      ...payload,
      passwordHash: await hash(payload.password, 6),
    });

    return {
      org,
    };
  }
}
