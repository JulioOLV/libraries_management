import { v4 as uuid } from "uuid";
import { BookFactoryProps } from "../../book/factory/book.factory";
import BookCollectionFactory from "./book-collection.factory";
import { BookCollectionTheme } from "../enums/book-collection-theme.enums";

describe("BookCollectionFactory unit tests", () => {
  it("should create a book collection", () => {
    const books = [
      {
        id: uuid(),
        name: "book name 1",
        edition: 1,
        releaseYear: 2005,
        totalPages: 150,
        authorId: uuid(),
      },
      {
        id: uuid(),
        name: "book name 2",
        edition: 1,
        releaseYear: 2010,
        totalPages: 200,
        authorId: uuid(),
      },
    ] satisfies BookFactoryProps[];

    const newBookCollection = {
      id: uuid(),
      libraryId: uuid(),
      theme: BookCollectionTheme.Ciencias,
      books,
    };

    const bookCollection = BookCollectionFactory.create(newBookCollection);

    expect(bookCollection.id.value).toEqual(newBookCollection.id);
    expect(bookCollection.libraryId.value).toEqual(newBookCollection.libraryId);
    expect(bookCollection.theme).toEqual(newBookCollection.theme);
    expect(bookCollection.books).toHaveLength(newBookCollection.books.length);
  });
});
