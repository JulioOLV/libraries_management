export default class AuthorNotFoundByIdError extends Error {
  constructor(authorId: string) {
    super(`Author with id ${authorId} not found.`);
  }
}
