export default class NoAuthorsFoundWithIdsError extends Error {
  constructor(ids: string[]) {
    super(
      `NoAuthorsFoundWithIdsError: no authors were found with the given ids ${ids.join(
        ","
      )}.`
    );
    this.name = "NoAuthorsFoundWithIdsError";
  }
}
