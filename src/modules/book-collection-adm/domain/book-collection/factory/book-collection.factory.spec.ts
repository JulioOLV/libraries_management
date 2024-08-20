import { BookFactoryProps } from "../../book/factory/book.factory";
import BookCollectionFactory from "./book-collection.factory";
import { BookCollectionTheme } from "../enums/book-collection-theme.enums";
import { faker } from "@faker-js/faker";

describe("BookCollectionFactory unit tests", () => {
  it("should create a book collection", () => {
    const books = [
      {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        edition: faker.number.int({ min: 1, max: 5 }),
        releaseYear: faker.number.int({ min: 2005, max: 2024 }),
        totalPages: faker.number.int({ min: 6, max: 500 }),
        authorId: faker.string.uuid(),
      },
      {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        edition: faker.number.int({ min: 1, max: 5 }),
        releaseYear: faker.number.int({ min: 2005, max: 2024 }),
        totalPages: faker.number.int({ min: 6, max: 500 }),
        authorId: faker.string.uuid(),
      },
    ] satisfies BookFactoryProps[];

    const newBookCollection = {
      id: faker.string.uuid(),
      libraryId: faker.string.uuid(),
      theme: faker.helpers.enumValue(BookCollectionTheme),
      books,
    };

    const bookCollection = BookCollectionFactory.create(newBookCollection);

    expect(bookCollection.id.value).toEqual(newBookCollection.id);
    expect(bookCollection.libraryId.value).toEqual(newBookCollection.libraryId);
    expect(bookCollection.theme).toEqual(newBookCollection.theme);
    expect(bookCollection.books).toHaveLength(newBookCollection.books.length);
  });
});
