import AuthorId from "../value-object/author-id.value-object";

export default class AuthorNotFoundError extends Error {
  constructor(authorId: AuthorId) {
    super(
      `AuthorNotFoundError: author with id ${authorId.value} not found in database.`
    );
  }
}
