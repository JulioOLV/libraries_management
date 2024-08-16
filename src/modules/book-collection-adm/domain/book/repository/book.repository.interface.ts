import Book from "../entity/book.entity";
import BookId from "../value-object/book-id.value-object";

export interface BookRepositoryInterface {
  registerBook(input: Book): Promise<BookId>;
}
