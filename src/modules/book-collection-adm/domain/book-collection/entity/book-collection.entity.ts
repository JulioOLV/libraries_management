import Entity from "@/modules/@shared/entity/base.entity";
import Book from "../../book/entity/book.entity";
import { BookCollectionTheme } from "../enums/book-collection-theme.enums";
import BookCollectionId from "../value-object/book-collection-id.value-object";
import LibraryId from "../value-object/library-id.value-object";

export type BookCollectionProps = {
  id?: BookCollectionId;
  theme: BookCollectionTheme;
  libraryId: LibraryId;
  deleted?: boolean;
};

export default class BookCollection extends Entity {
  private _theme: BookCollectionTheme;
  private _books: Book[] = [];
  private _libraryId: LibraryId;
  private _totalAmountOfBooks: number = 0;

  constructor(bookCollectionProps: BookCollectionProps) {
    super(bookCollectionProps.id, bookCollectionProps.deleted);
    this._libraryId = bookCollectionProps.libraryId;
    this._theme = bookCollectionProps.theme;
  }

  public get theme(): BookCollectionTheme {
    return this._theme;
  }

  public get books(): Book[] {
    return this._books;
  }

  public get libraryId(): LibraryId {
    return this._libraryId;
  }

  public get totalAmountOfBooks(): number {
    return this._totalAmountOfBooks;
  }

  public addBookToCollection(book: Book) {
    this.books.push(book);
    this.discoveryTotalAmountOfBooks();
  }

  public removeBookToCollection(bookId: string) {
    if (!bookId) {
      throw new Error("param bookId is required");
    }

    if (!this._books?.length) {
      throw new Error("book list is empty");
    }

    const index = this._books.findIndex(
      (book: Book) => book.id.value === bookId
    );

    if (index === -1) {
      throw new Error(`book with bookId ${bookId} is not present in book list`);
    }

    this._books.splice(index, 1);

    this.discoveryTotalAmountOfBooks();
  }

  private discoveryTotalAmountOfBooks() {
    this._totalAmountOfBooks = this._books.filter(
      (book: Book) => !book.deleted
    ).length;
  }
}
