import { v4 as uuid } from "uuid";
import BookFactory, { BookFactoryProps } from "./book.factory";

describe("BookFactory unit test", () => {
  it("should create a book", () => {
    const newBook = {
      id: uuid(),
      name: "book name",
      edition: 1,
      releaseYear: 2005,
      totalPages: 150,
      authorId: uuid(),
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
