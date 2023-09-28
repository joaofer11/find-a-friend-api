import { it, expect, describe, beforeEach } from 'vitest';

import { compare } from 'bcryptjs';
import { RegisterOrgService } from './register-org-service';
import { OrgEmailAlreadyExistsError } from './errors/org-email-already-exists-error';
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';

describe('Register ORG Service', () => {
  let orgRepository: InMemoryOrgRepository;
  let SUT: RegisterOrgService;

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    SUT = new RegisterOrgService({ orgRepository });
  });

  it('should not be able to register an ORG with same email twice', async () => {
    const EMAIL = 'johndoe@example.com';

    await SUT.execute({
      name: 'John Doe ORG',
      email: EMAIL,
      password: '123456',
      state: '',
      city: '',
      address: '',
      postalCode: '',
      whatsAppNumber: '',
    });

    await expect(() =>
      SUT.execute({
        name: 'John Doe ORG',
        email: EMAIL,
        password: '123456',
        state: '',
        city: '',
        address: '',
        postalCode: '',
        whatsAppNumber: '',
      })
    ).rejects.toBeInstanceOf(OrgEmailAlreadyExistsError);
  });

  it('should be able to encrypt (hashing) the ORG password upon registration', async () => {
    const PASSWORD = '123456';

    const { org } = await SUT.execute({
      name: 'John Doe ORG',
      email: 'johndoeorg@example.com',
      password: PASSWORD,
      state: '',
      city: '',
      address: '',
      postalCode: '',
      whatsAppNumber: '',
    });

    const hasPasswordCorrectlyEncrypted = await compare(
      PASSWORD,
      org.passwordHash
    );

    expect(hasPasswordCorrectlyEncrypted).toBe(true);
  });

  it('should be able to register as an ORG', async () => {
    const { org } = await SUT.execute({
      name: 'John Doe ORG',
      email: 'johndoeorg@example.com',
      password: '123456',
      state: '',
      city: '',
      address: '',
      postalCode: '',
      whatsAppNumber: '',
    });

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: org.name,
        email: org.email,
      })
    );

    expect(orgRepository.items[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: org.name,
        email: org.email,
      })
    );
  });
});
