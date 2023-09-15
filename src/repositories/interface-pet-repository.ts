import { Pet, AdoptionRequirement, Org, Prisma } from '@prisma/client';
import * as Enums from '../interfaces/pet-enums';

export interface IFindManyByRegionParams {
  state: string;
  city: string;
  page: number;
  query?: {
    age?: Enums.TAge;
    size?: Enums.TSize;
    energyLevel?: Enums.TLevel;
    dependenceLevel?: Enums.TLevel;
  };
}

export interface IAddParams {}

export interface IPetRepository {
  add(
    petData: Prisma.PetUncheckedCreateInput,
    adoptionRequirementsData?: Pick<
      Prisma.AdoptionRequirementUncheckedCreateInput,
      'issue'
    >[]
  ): Promise<Pet>;

  findManyByRegion(params: IFindManyByRegionParams): Promise<Pet[]>;

  findById(
    id: number
  ): Promise<
    | (Pet & { adoptionRequirements: AdoptionRequirement[] } & Pick<
          Org,
          'state' | 'city' | 'address' | 'whatsAppNumber'
        >)
    | null
  >;
}
