import BookCollection from "./book-collection.entity";
import Book from "../../book/entity/book.entity";
import Edition from "../../book/value-object/edition.value-object";
import ReleaseYear from "../../book/value-object/release-year.value-object";
import BookCollectionId from "../value-object/book-collection-id.value-object";
import AuthorId from "../../book/value-object/author-id.value-object";
import { BookCollectionTheme } from "../enums/book-collection-theme.enums";
import LibraryId from "../value-object/library-id.value-object";

describe("BookCollectionEntity unit tests", () => {
  it("should return error when trying to remove a book that does not exist in collection in empty list situation", () => {
    expect(() => {
      const bookCollection = new BookCollection({
        libraryId: new LibraryId(),
        theme: BookCollectionTheme.Ciencias,
      });

      bookCollection.removeBookToCollection("1");
    }).toThrow("book list is empty");
  });

  it("should return error when trying to remove a book that does not exist in collection", () => {
    expect(() => {
      const bookCollection = new BookCollection({
        libraryId: new LibraryId(),
        theme: BookCollectionTheme.Ciencias,
      });

      bookCollection.addBookToCollection(
        new Book({
          id: new BookCollectionId(),
          name: "book name 1",
          authorId: new AuthorId(),
          edition: new Edition(1),
          releaseYear: new ReleaseYear(2000),
          totalPages: 200,
        })
      );

      bookCollection.removeBookToCollection("2");
    }).toThrow("book with bookId 2 is not present in book list");
  });

  it("should return error when trying to remove a book that not pass a valid bookId", () => {
    expect(() => {
      const bookCollection = new BookCollection({
        libraryId: new LibraryId(),
        theme: BookCollectionTheme.Ciencias,
      });

      bookCollection.removeBookToCollection("");
    }).toThrow("param bookId is required");
  });

  it("should add book on collection list", () => {
    const bookCollection = new BookCollection({
      libraryId: new LibraryId(),
      theme: BookCollectionTheme.Ciencias,
    });

    const book = new Book({
      id: new BookCollectionId(),
      name: "book name 1",
      authorId: new AuthorId(),
      edition: new Edition(1),
      releaseYear: new ReleaseYear(2000),
      totalPages: 200,
    });

    bookCollection.addBookToCollection(book);

    expect(bookCollection.books).toHaveLength(1);
    expect(bookCollection.books[0].id).toBe(book.id);
    expect(bookCollection.books[0].name).toBe(book.name);
    expect(bookCollection.books[0].deleted).toBe(book.deleted);
  });

  it("should remove a specific book on collection list", () => {
    const bookCollection = new BookCollection({
      libraryId: new LibraryId(),
      theme: BookCollectionTheme.Ciencias,
    });

    const books = [
      new Book({
        id: new BookCollectionId(),
        name: "book name 1",
        authorId: new AuthorId(),
        edition: new Edition(1),
        releaseYear: new ReleaseYear(2000),
        totalPages: 200,
      }),
      new Book({
        id: new BookCollectionId(),
        name: "book name 2",
        authorId: new AuthorId(),
        edition: new Edition(1),
        releaseYear: new ReleaseYear(2005),
        totalPages: 150,
      }),
    ];

    books.forEach((book: Book) => bookCollection.addBookToCollection(book));

    expect(bookCollection.books).toHaveLength(2);

    bookCollection.removeBookToCollection(books[0].id.value);

    expect(bookCollection.books).toHaveLength(1);
    expect(bookCollection.books[0].id).toBe(books[1].id);
    expect(bookCollection.books[0].name).toBe(books[1].name);
    expect(bookCollection.books[0].deleted).toBe(books[1].deleted);
  });

  it("should count total books on collection list", () => {
    const bookCollection = new BookCollection({
      libraryId: new LibraryId(),
      theme: BookCollectionTheme.Ciencias,
    });

    const books = [
      new Book({
        id: new BookCollectionId(),
        name: "book name 1",
        authorId: new AuthorId(),
        edition: new Edition(1),
        releaseYear: new ReleaseYear(2000),
        totalPages: 200,
      }),
      new Book({
        id: new BookCollectionId(),
        name: "book name 2",
        authorId: new AuthorId(),
        edition: new Edition(1),
        releaseYear: new ReleaseYear(2005),
        totalPages: 150,
      }),
    ];

    books.forEach((book: Book) => bookCollection.addBookToCollection(book));

    expect(bookCollection.totalAmountOfBooks).toBe(2);
  });
});
