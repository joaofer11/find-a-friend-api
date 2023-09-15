import { Pet } from '@prisma/client';
import * as Enums from '../custom-types/pet-enums';
import { IPetRepository } from '@/repositories/interface-pet-repository';

interface IFetchPetsServiceRepositories {
  petRepository: IPetRepository;
}

interface IFetchPetsServiceInput {
  state: string;
  city: string;
  page?: number;
  query?: {
    age?: Enums.TAge;
    size?: Enums.TSize;
    energyLevel?: Enums.TLevel;
    dependenceLevel?: Enums.TLevel;
  };
}

interface IFetchPetsServiceOutput {
  pets: Pet[];
}

export class FetchPetsService {
  #petRepository: IPetRepository;

  constructor({ petRepository }: IFetchPetsServiceRepositories) {
    this.#petRepository = petRepository;
  }

  async execute({
    city,
    state,
    query,
    page,
  }: IFetchPetsServiceInput): Promise<IFetchPetsServiceOutput> {
    const pets = await this.#petRepository.findManyByRegion({
      city: city.toUpperCase(),
      state: state.toUpperCase(),
      page: page ?? 1,
      query,
    });

    return {
      pets,
    };
  }
}
