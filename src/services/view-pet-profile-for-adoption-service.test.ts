import { it, describe, expect, beforeEach } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository';
import { ViewPetProfileForAdoptionService } from './view-pet-profile-for-adoption-service';

describe('Register Pet Service', () => {
  let petRepository: InMemoryPetRepository;
  let sut: ViewPetProfileForAdoptionService;

  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new ViewPetProfileForAdoptionService({ petRepository });
  });

  it('should be able to view a pet profile for adoption', async () => {
    petRepository.orgs.push({
      id: 'org-01',
      name: 'John Doe ORG',
      description: '',
      email: 'johndoe@gmail.com',
      passwordHash: '123456',
      whatsAppNumber: '',
      state: 'SP',
      city: 'SÃO PAULO',
      address: '',
      postalCode: '',
    });

    const createdPet = await petRepository.add(
      {
        id: 10,
        name: 'Spike',
        specie: 'dog',
        description: '',
        age: 'JUNIOR',
        size: 'MEDIUM',
        environment: 'OPEN',
        dependenceLevel: 'MEDIUM',
        energyLevel: 'MEDIUM',
        orgId: petRepository.orgs[0].id,
      },
      [
        { issue: '', petId: 10 },
        { issue: '', petId: 10 },
      ]
    );

    const { pet } = await sut.execute({ petId: createdPet.id });

    expect(pet.adoptionRequirements).toHaveLength(2);
    expect(pet).toEqual(
      expect.objectContaining({
        state: petRepository.orgs[0].state,
        city: petRepository.orgs[0].city,
        address: '',
        whatsAppNumber: '',
      })
    );
  });

  it('should not be able to view a pet profile for adoption with a non-existing id', async () => {
    const NON_EXISTING_ID = 0;

    await expect(() =>
      sut.execute({ petId: NON_EXISTING_ID })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
