import BookFactory, { BookFactoryProps } from "./book.factory";
import { faker } from "@faker-js/faker";

describe("BookFactory unit test", () => {
  it("should create a book", () => {
    const newBook = {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      edition: faker.number.int({ min: 1, max: 5 }),
      releaseYear: faker.number.int({ min: 2005, max: 2024 }),
      totalPages: faker.number.int({ min: 6, max: 500 }),
      authorId: faker.string.uuid(),
    } satisfies BookFactoryProps;

    const book = BookFactory.create(newBook);

    expect({
      id: book.id.value,
      name: book.name,
      edition: book.edition.value,
      releaseYear: book.releaseYear.value,
      totalPages: book.totalPages,
      authorId: book.authorId.value,
    }).toMatchObject({
      id: newBook.id,
      name: newBook.name,
      edition: newBook.edition,
      releaseYear: newBook.releaseYear,
      totalPages: newBook.totalPages,
      authorId: newBook.authorId,
    });
  });
});
