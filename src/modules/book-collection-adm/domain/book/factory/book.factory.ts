import Book from "../entity/book.entity";
import AuthorId from "../value-object/author-id.value-object";
import BookId from "../value-object/book-id.value-object";
import Edition from "../value-object/edition.value-object";
import ReleaseYear from "../value-object/release-year.value-object";

export type BookFactoryProps = {
  id?: string;
  name: string;
  authorId: string;
  edition: number;
  releaseYear: number;
  totalPages: number;
  availability: boolean;
};

export default class BookFactory {
  static create(props: BookFactoryProps): Book {
    const book = new Book({
      id: new BookId(props.id),
      name: props.name,
      authorId: new AuthorId(props.authorId),
      edition: new Edition(props.edition),
      releaseYear: new ReleaseYear(props.releaseYear),
      totalPages: props.totalPages,
    });

    if (!props.availability) {
      book.takeOutALoan();
    }

    return book;
  }
}
