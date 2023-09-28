import { compare } from 'bcryptjs';
import { Org } from '@prisma/client';
import { IOrgRepository } from '@/repositories/interface-org-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface IAuthenticateOrgServiceRepositories {
  orgRepository: IOrgRepository;
}

interface IAuthenticateOrgServiceInput {
  email: string;
  password: string;
}

interface IAuthenticateOrgServiceOutput {
  org: Org;
}

export class AuthenticateOrgService {
  #orgRepository: IOrgRepository;

  constructor({ orgRepository }: IAuthenticateOrgServiceRepositories) {
    this.#orgRepository = orgRepository;
  }

  async execute(
    payload: IAuthenticateOrgServiceInput
  ): Promise<IAuthenticateOrgServiceOutput> {
    const org = await this.#orgRepository.findByEmail(payload.email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(payload.password, org.passwordHash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
