import { it, describe, expect, beforeEach } from 'vitest';
import { FetchPetsService } from './fetch-pets-service';
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository';

describe('Register Pet Service', () => {
  let petRepository: InMemoryPetRepository;
  let sut: FetchPetsService;

  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new FetchPetsService({ petRepository });

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

    petRepository.orgs.push({
      id: 'org-02',
      name: 'Jane Doe ORG',
      description: '',
      email: 'janedoe@gmail.com',
      passwordHash: '123456',
      whatsAppNumber: '',
      state: 'SP',
      city: 'SÃO PAULO',
      address: '',
      postalCode: '',
    });

    for (let i = 1; i <= 5; i++) {
      petRepository.add({
        name: `Spike-0${i}`,
        specie: 'dog',
        description: '',
        age: 'JUNIOR',
        size: 'MEDIUM',
        environment: 'OPEN',
        dependenceLevel: 'MEDIUM',
        energyLevel: 'MEDIUM',
        orgId: petRepository.orgs[0].id,
      });

      petRepository.add({
        name: `Tom-0${i}`,
        specie: 'cat',
        description: '',
        age: 'JUNIOR',
        size: 'MEDIUM',
        environment: 'OPEN',
        dependenceLevel: 'MEDIUM',
        energyLevel: 'MEDIUM',
        orgId: petRepository.orgs[1].id,
      });
    }
  });

  it('should be able to fetch pets by region', async () => {
    const { pets } = await sut.execute({ state: 'sp', city: 'São Paulo' });

    expect(pets).toHaveLength(10);
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Spike-01',
        orgId: 'org-01',
        state: 'SP',
        city: 'SÃO PAULO',
        address: '',
        whatsAppNumber: '',
      })
    );
    expect(pets[1]).toEqual(
      expect.objectContaining({
        name: 'Tom-01',
        orgId: 'org-02',
        state: 'SP',
        city: 'SÃO PAULO',
        address: '',
        whatsAppNumber: '',
      })
    );
  });

  it('should be able to fetch pets by region queried', async () => {
    for (let i = 1; i <= 3; i++) {
      petRepository.add({
        name: `Spike-0${i}`,
        specie: 'dog',
        description: '',
        age: 'NEW_BORN',
        size: 'BIG',
        environment: 'OPEN',
        dependenceLevel: 'MEDIUM',
        energyLevel: 'HIGH',
        orgId: petRepository.orgs[0].id,
      });

      petRepository.add({
        name: `Tom-0${i}`,
        specie: 'cat',
        description: '',
        age: 'NEW_BORN',
        size: 'BIG',
        environment: 'OPEN',
        dependenceLevel: 'MEDIUM',
        energyLevel: 'HIGH',
        orgId: petRepository.orgs[1].id,
      });
    }

    const { pets } = await sut.execute({
      state: 'sp',
      city: 'São Paulo',
      query: {
        age: 'NEW_BORN',
        energyLevel: 'HIGH',
        dependenceLevel: 'MEDIUM',
        size: 'BIG',
      },
    });

    expect(pets).toHaveLength(6);
    expect(petRepository.items).toHaveLength(16);
    expect(pets[0]).toEqual(
      expect.objectContaining({
        orgId: 'org-01',
        state: 'SP',
        city: 'SÃO PAULO',
        age: 'NEW_BORN',
        energyLevel: 'HIGH',
        dependenceLevel: 'MEDIUM',
        size: 'BIG',
      })
    );
    expect(pets[1]).toEqual(
      expect.objectContaining({
        orgId: 'org-02',
        state: 'SP',
        city: 'SÃO PAULO',
        age: 'NEW_BORN',
        energyLevel: 'HIGH',
        dependenceLevel: 'MEDIUM',
        size: 'BIG',
      })
    );
  });

  it('should be able to fetch paginated pets by region', async () => {
    const THRESHOLD_OF_PREVIOUS_LOOP = 5;

    for (let i = 1; i <= 25; i++) {
      petRepository.add({
        name: `Spike-0${THRESHOLD_OF_PREVIOUS_LOOP + 1}`,
        specie: 'dog',
        description: '',
        age: 'JUNIOR',
        size: 'MEDIUM',
        environment: 'OPEN',
        dependenceLevel: 'MEDIUM',
        energyLevel: 'MEDIUM',
        orgId: petRepository.orgs[0].id,
      });

      petRepository.add({
        name: `Tom-0${THRESHOLD_OF_PREVIOUS_LOOP + 1}`,
        specie: 'cat',
        description: '',
        age: 'JUNIOR',
        size: 'MEDIUM',
        environment: 'OPEN',
        dependenceLevel: 'MEDIUM',
        energyLevel: 'MEDIUM',
        orgId: petRepository.orgs[1].id,
      });
    }

    const { pets } = await sut.execute({
      state: 'sp',
      city: 'São Paulo',
      page: 3,
    });

    expect(petRepository.items).toHaveLength(60);
    expect(pets).toHaveLength(20);
    expect(pets[0]).toEqual(expect.objectContaining({ id: 41 }));
    expect(pets[pets.length - 1]).toEqual(expect.objectContaining({ id: 60 }));
  });
});
