export class OrgEmailAlreadyExistsError extends Error {
  constructor() {
    // eslint-disable-next-line quotes
    super("There's already exists a user with this email.");
  }
}
