import { faker } from "@faker-js/faker";
import BookFactory, { BookFactoryProps } from "../factory/book.factory";

describe("BookEntity unit tests", () => {
  it("should return error when name is not provided", () => {
    expect(() => {
      const newBook = {
        id: faker.string.uuid(),
        name: "",
        edition: faker.number.int({ min: 1, max: 5 }),
        releaseYear: faker.number.int({ min: 2005, max: 2024 }),
        authorId: faker.string.uuid(),
        totalPages: faker.number.int({ min: 90, max: 200 }),
      } satisfies BookFactoryProps;

      BookFactory.create(newBook);
    }).toThrow("book: name is required");
  });

  it("should return an error when the name length is less than 5", () => {
    expect(() => {
      const newBook = {
        id: faker.string.uuid(),
        name: "a",
        edition: faker.number.int({ min: 1, max: 5 }),
        releaseYear: faker.number.int({ min: 2005, max: 2024 }),
        authorId: faker.string.uuid(),
        totalPages: faker.number.int({ min: 90, max: 200 }),
      } satisfies BookFactoryProps;

      BookFactory.create(newBook);
    }).toThrow("book: name length must be greater than or equal to 5");
  });

  it("should return an error when the total number of pages is less than or equal to 5", () => {
    expect(() => {
      const newBook = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        edition: faker.number.int({ min: 1, max: 5 }),
        releaseYear: faker.number.int({ min: 2005, max: 2024 }),
        authorId: faker.string.uuid(),
        totalPages: faker.number.int({ min: 1, max: 5 }),
      } satisfies BookFactoryProps;

      BookFactory.create(newBook);
    }).toThrow("book: the total number of pages must be greater than 5");
  });

  it("should return an error when there is an update in the total number of pages to less than or equal to 5", () => {
    expect(() => {
      const newBook = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        edition: faker.number.int({ min: 1, max: 5 }),
        releaseYear: faker.number.int({ min: 2005, max: 2024 }),
        authorId: faker.string.uuid(),
        totalPages: faker.number.int({ min: 6, max: 100 }),
      } satisfies BookFactoryProps;

      const book = BookFactory.create(newBook);

      book.changeTotalPages(2);
    }).toThrow("book: the total number of pages must be greater than 5");
  });

  it("should return an error when trying to borrow a book that is not available", () => {
    expect(() => {
      const newBook = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        edition: faker.number.int({ min: 1, max: 5 }),
        releaseYear: faker.number.int({ min: 2005, max: 2024 }),
        authorId: faker.string.uuid(),
        totalPages: faker.number.int({ min: 6, max: 100 }),
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
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      edition: faker.number.int({ min: 1, max: 5 }),
      releaseYear: faker.number.int({ min: 2005, max: 2024 }),
      authorId: faker.string.uuid(),
      totalPages: faker.number.int({ min: 6, max: 100 }),
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
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      edition: faker.number.int({ min: 1, max: 5 }),
      releaseYear: faker.number.int({ min: 2005, max: 2024 }),
      authorId: faker.string.uuid(),
      totalPages: faker.number.int({ min: 6, max: 100 }),
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
