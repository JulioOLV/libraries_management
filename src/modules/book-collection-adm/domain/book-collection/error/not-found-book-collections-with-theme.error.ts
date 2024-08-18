export default class NotFoundBookCollectionWithThemeError extends Error {
  constructor(theme: string) {
    super(`Not found book collections with theme ${theme}`);
    this.name = "NotFoundBookCollectionWithThemeError";
  }
}
