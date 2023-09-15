import { it, describe, expect, beforeEach } from 'vitest';
import { RegisterPetService } from './register-pet-service';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository';
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';

describe('Register Pet Service', () => {
  let orgRepository: InMemoryOrgRepository;
  let petRepository: InMemoryPetRepository;
  let sut: RegisterPetService;

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository();
    sut = new RegisterPetService({ petRepository, orgRepository });
  });

  it('should be able to register a pet', async () => {
    const org = await orgRepository.add({
      name: 'John Doe Org',
      email: 'johndoe@gmail.com',
      description: '',
      passwordHash: '123456',
      state: '',
      city: '',
      address: '',
      postalCode: '',
      whatsAppNumber: '',
    });

    const { pet } = await sut.execute({
      name: 'Spike',
      specie: 'dog',
      age: 'JUNIOR',
      description: '',
      size: 'MEDIUM',
      energyLevel: 'MEDIUM',
      environment: 'OPEN',
      dependenceLevel: 'MEDIUM',
      orgId: org.id,
    });

    expect(pet).toEqual(
      expect.objectContaining({
        id: pet.id,
        name: pet.name,
        specie: pet.specie,
        orgId: org.id,
      })
    );
  });

  it('should not be able to register a pet without an ORG associated', async () => {
    await expect(() =>
      sut.execute({
        name: 'Spike',
        specie: 'dog',
        age: 'JUNIOR',
        description: '',
        size: 'MEDIUM',
        energyLevel: 'MEDIUM',
        environment: 'OPEN',
        dependenceLevel: 'MEDIUM',
        orgId: 'WRONG_ORG',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
