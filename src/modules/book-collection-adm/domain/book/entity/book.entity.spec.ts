import { v4 as uuid } from "uuid";
import BookFactory, { BookFactoryProps } from "../factory/book.factory";

describe("BookEntity unit tests", () => {
  it("should return error when name is not provided", () => {
    expect(() => {
      const newBook = {
        id: uuid(),
        name: "",
        edition: 1,
        releaseYear: 2020,
        authorId: uuid(),
        totalPages: 100,
      } satisfies BookFactoryProps;

      BookFactory.create(newBook);
    }).toThrow("book: name is required");
  });

  it("should return an error when the name length is less than 5", () => {
    expect(() => {
      const newBook = {
        id: uuid(),
        name: "a",
        edition: 1,
        releaseYear: 2020,
        authorId: uuid(),
        totalPages: 100,
      } satisfies BookFactoryProps;

      BookFactory.create(newBook);
    }).toThrow("book: name length must be greater than or equal to 5");
  });

  it("should return an error when the total number of pages is less than or equal to 5", () => {
    expect(() => {
      const newBook = {
        id: uuid(),
        name: "book name",
        edition: 1,
        releaseYear: 2020,
        authorId: uuid(),
        totalPages: 5,
      } satisfies BookFactoryProps;

      BookFactory.create(newBook);
    }).toThrow("book: the total number of pages must be greater than 5");
  });

  it("should return an error when there is an update in the total number of pages to less than or equal to 5", () => {
    expect(() => {
      const newBook = {
        id: uuid(),
        name: "book name",
        edition: 1,
        releaseYear: 2020,
        authorId: uuid(),
        totalPages: 6,
      } satisfies BookFactoryProps;

      const book = BookFactory.create(newBook);

      book.changeTotalPages(2);
    }).toThrow("book: the total number of pages must be greater than 5");
  });

  it("should return an error when trying to borrow a book that is not available", () => {
    expect(() => {
      const newBook = {
        id: uuid(),
        name: "book name",
        edition: 1,
        releaseYear: 2020,
        authorId: uuid(),
        totalPages: 100,
      } satisfies BookFactoryProps;

      const book = BookFactory.create(newBook);

      book.takeOutALoan();
      book.takeOutALoan();
    }).toThrow(
      "book: it is not possible to borrow a book that is not available"
    );
  });

  it("should create a valid book", () => {
    const newBook = {
      id: uuid(),
      name: "book name",
      edition: 1,
      releaseYear: 2020,
      authorId: uuid(),
      totalPages: 100,
    } satisfies BookFactoryProps;

    const book = BookFactory.create(newBook);

    expect(book.id.value).toEqual(newBook.id);
    expect(book.name).toEqual(newBook.name);
    expect(book.edition.value).toEqual(newBook.edition);
    expect(book.releaseYear.value).toEqual(newBook.releaseYear);
    expect(book.totalPages).toEqual(newBook.totalPages);
    expect(book.authorId.value).toEqual(newBook.authorId);
    expect(book.availability).toBeTruthy();
  });

  it("should create a valid book unavailable", () => {
    const newBook = {
      id: uuid(),
      name: "book name",
      edition: 1,
      releaseYear: 2020,
      authorId: uuid(),
      totalPages: 100,
    } satisfies BookFactoryProps;

    const book = BookFactory.create(newBook);

    book.takeOutALoan();

    expect(book.id.value).toEqual(newBook.id);
    expect(book.name).toEqual(newBook.name);
    expect(book.edition.value).toEqual(newBook.edition);
    expect(book.releaseYear.value).toEqual(newBook.releaseYear);
    expect(book.totalPages).toEqual(newBook.totalPages);
    expect(book.authorId.value).toEqual(newBook.authorId);
    expect(book.availability).toBeFalsy();
  });
});
