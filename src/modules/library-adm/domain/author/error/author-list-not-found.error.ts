import AuthorId from "../value-object/author-id.value-object";

export default class AuthorListNotFoundError extends Error {
  constructor(authorIdList: AuthorId[]) {
    super(
      `AuthorListNotFoundError: author with id ${authorIdList
        .map((authorId) => authorId.value)
        .join(",")} not found in database.`
    );
  }
}
