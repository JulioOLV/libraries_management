export default class LibraryNotFoundError extends Error {
  constructor(libraryIds: string) {
    super(`Library with id(s) ${libraryIds} not found in database.`);
  }
}
