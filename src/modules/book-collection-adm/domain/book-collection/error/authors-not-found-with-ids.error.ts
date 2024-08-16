export default class AuthorsNotFoundWithIdsError extends Error {
  constructor(authorsIdsList: string) {
    super(`Authors not found with ids ${authorsIdsList}`);
  }
}
