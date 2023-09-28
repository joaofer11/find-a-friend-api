import { it, expect, describe, beforeEach } from 'vitest';

import { compare, hash } from 'bcryptjs';
import { AuthenticateOrgService } from './authenticate-org-service';
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Register ORG Service', () => {
  let orgRepository: InMemoryOrgRepository;
  let SUT: AuthenticateOrgService;

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    SUT = new AuthenticateOrgService({ orgRepository });
  });

  it('should not be able to authenticate an ORG with invalid email', async () => {
    orgRepository.add({
      name: 'John Doe ORG',
      email: 'johndoe@example.com',
      passwordHash: '123456',
      state: '',
      city: '',
      address: '',
      postalCode: '',
      whatsAppNumber: '',
    });

    await expect(() =>
      SUT.execute({
        email: 'INVALID_EMAIL',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate an ORG with invalid password', async () => {
    orgRepository.add({
      name: 'John Doe ORG',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      state: '',
      city: '',
      address: '',
      postalCode: '',
      whatsAppNumber: '',
    });

    await expect(() =>
      SUT.execute({
        email: 'johndoe@example.com',
        password: 'INVALID_PASSWORD',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should be able to authenticate an ORG', async () => {
    orgRepository.add({
      id: '8',
      name: 'John Doe ORG',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      state: '',
      city: '',
      address: '',
      postalCode: '',
      whatsAppNumber: '',
    });

    const { org } = await SUT.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(org).toEqual(
      expect.objectContaining({
        id: '8',
        name: 'John Doe ORG',
        passwordHash: expect.any(String),
      })
    );
  });
});
