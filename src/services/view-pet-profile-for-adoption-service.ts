import { AdoptionRequirement, Org, Pet } from '@prisma/client';
import { IPetRepository } from '@/repositories/interface-pet-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IViewPetProfileForAdoptionServiceRepositories {
  petRepository: IPetRepository;
}

interface IViewPetProfileForAdoptionServiceInput {
  petId: number;
}

interface IViewPetProfileForAdoptionServiceOutput {
  pet: Pet & { adoptionRequirements: AdoptionRequirement[] } & Pick<
      Org,
      'state' | 'city' | 'address' | 'whatsAppNumber'
    >;
}

export class ViewPetProfileForAdoptionService {
  #petRepository: IPetRepository;

  constructor({
    petRepository,
  }: IViewPetProfileForAdoptionServiceRepositories) {
    this.#petRepository = petRepository;
  }

  async execute({
    petId,
  }: IViewPetProfileForAdoptionServiceInput): Promise<IViewPetProfileForAdoptionServiceOutput> {
    const pet = await this.#petRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
