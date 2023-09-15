import { Pet } from '@prisma/client';
import * as Enums from '@/custom-types/pet-enums';
import { IPetRepository } from '@/repositories/interface-pet-repository';
import { IOrgRepository } from '@/repositories/interface-org-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IRegisterPetServiceRepositories {
  petRepository: IPetRepository;
  orgRepository: IOrgRepository;
}

interface IRegisterPetServiceInput {
  name: string;
  description?: string | null;
  specie: string;
  age?: Enums.TAge;
  environment?: Enums.TEnvironment;
  size?: Enums.TSize;
  energyLevel?: Enums.TLevel;
  dependenceLevel?: Enums.TLevel;
  orgId: string;
  adoptionRequirements?: { issue: string }[];
}

interface IRegisterPetServiceOutput {
  pet: Pet;
}

export class RegisterPetService {
  #petRepository: IPetRepository;
  #orgRepository: IOrgRepository;

  constructor({
    petRepository,
    orgRepository,
  }: IRegisterPetServiceRepositories) {
    this.#petRepository = petRepository;
    this.#orgRepository = orgRepository;
  }

  async execute(
    data: IRegisterPetServiceInput
  ): Promise<IRegisterPetServiceOutput> {
    const { adoptionRequirements, ...petData } = data;

    const org = await this.#orgRepository.findById(petData.orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.#petRepository.add(petData, adoptionRequirements);

    return {
      pet,
    };
  }
}
