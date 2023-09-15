import { AdoptionRequirement, Org, Pet, Prisma } from '@prisma/client';
import {
  IPetRepository,
  IFindManyByRegionParams,
} from '../interface-pet-repository';

export class InMemoryPetRepository implements IPetRepository {
  items: Pet[] = [];
  adoptionRequirements: AdoptionRequirement[] = [];
  orgs: Org[] = [];

  async add(
    petData: Prisma.PetUncheckedCreateInput,
    adoptionRequirementsData?: Prisma.AdoptionRequirementUncheckedCreateInput[]
  ) {
    const pet: Pet = {
      id: petData.id ?? this.items.length + 1,
      name: petData.name,
      age: petData.age ?? 'TEEN',
      description: petData.description ?? null,
      orgId: petData.orgId,
      size: petData.size ?? 'MEDIUM',
      dependenceLevel: petData.dependenceLevel ?? 'MEDIUM',
      energyLevel: petData.energyLevel ?? 'MEDIUM',
      environment: petData.environment ?? 'OPEN',
      specie: petData.specie,
    };

    if (!adoptionRequirementsData) {
      this.items.push(pet);
      return pet;
    }

    this.items.push(pet);

    adoptionRequirementsData.forEach((adoptionRequirement) => {
      this.adoptionRequirements.push({
        id: adoptionRequirement.id ?? this.adoptionRequirements.length + 1,
        issue: adoptionRequirement.issue,
        petId: adoptionRequirement.petId,
      });
    });

    return {
      ...pet,
      adoptionRequirements: this.adoptionRequirements.filter(
        (item) => item.petId === pet.id
      ),
    };
  }

  async findManyByRegion({
    state,
    city,
    page,
    query,
  }: IFindManyByRegionParams) {
    const orgsByRegion = this.orgs.filter(
      (org) => org.state === state && org.city === city
    );

    const pets = this.items.reduce((acc, item) => {
      const orgWhichOwnsThisPet = orgsByRegion.find(
        (org) => org.id === item.orgId
      );

      if (!orgWhichOwnsThisPet) return acc;

      if (!query) {
        acc.push({
          ...item,
          whatsAppNumber: orgWhichOwnsThisPet.whatsAppNumber,
          state: orgWhichOwnsThisPet.state,
          city: orgWhichOwnsThisPet.city,
          address: orgWhichOwnsThisPet.address,
        });

        return acc;
      }

      const { age, size, energyLevel, dependenceLevel } = query;

      const doesThisPetMatchToQuery =
        (!age || item.age === age) &&
        (!size || item.size === size) &&
        (!energyLevel || item.energyLevel === energyLevel) &&
        (!dependenceLevel || item.dependenceLevel === dependenceLevel);

      if (!doesThisPetMatchToQuery) return acc;

      acc.push({
        ...item,
        whatsAppNumber: orgWhichOwnsThisPet.whatsAppNumber,
        state: orgWhichOwnsThisPet.state,
        city: orgWhichOwnsThisPet.city,
        address: orgWhichOwnsThisPet.address,
      });

      return acc;
    }, [] as Array<Pet & Pick<Org, 'whatsAppNumber' | 'state' | 'city' | 'address'>>);

    return pets.slice((page - 1) * 20, page * 20);
  }

  async findById(id: number) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    const { state, city, address, whatsAppNumber } = this.orgs.find(
      (org) => org.id === pet.orgId
    )!;

    return {
      ...pet,
      adoptionRequirements: this.adoptionRequirements.filter(
        (adoptionRequirement) => adoptionRequirement.petId === pet.id
      ),
      state,
      city,
      address,
      whatsAppNumber,
    };
  }
}
