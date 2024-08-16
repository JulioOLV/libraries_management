export default class NoAuthorIdProvidedError extends Error {
  constructor() {
    super(
      "NoAuthorIdProvidedError: no author id was provided in the list for search."
    );
  }
}
