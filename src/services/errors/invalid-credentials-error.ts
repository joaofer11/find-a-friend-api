export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials: please check email/password.');
  }
}
