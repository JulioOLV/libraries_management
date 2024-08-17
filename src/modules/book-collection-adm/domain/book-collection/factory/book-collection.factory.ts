import BookCollectionModel from "@/modules/book-collection-adm/infrastructure/book-collection/repository/typeorm/book-collection.model";
import BookFactory, { BookFactoryProps } from "../../book/factory/book.factory";
import BookCollection from "../entity/book-collection.entity";
import { BookCollectionTheme } from "../enums/book-collection-theme.enums";
import BookCollectionId from "../value-object/book-collection-id.value-object";
import LibraryId from "../value-object/library-id.value-object";
import BookModel from "@/modules/book-collection-adm/infrastructure/book/repository/typeorm/book.model";

export type BookCollectionProps = {
  id?: string;
  libraryId: string;
  theme: string;
  books: BookFactoryProps[];
};

export default class BookCollectionFactory {
  public static create(props: BookCollectionProps): BookCollection {
    const bookCollection = new BookCollection({
      id: new BookCollectionId(props.id),
      libraryId: new LibraryId(props.libraryId),
      theme: props.theme as BookCollectionTheme,
    });

    props.books.forEach((book: BookFactoryProps) => {
      bookCollection.addBookToCollection(
        BookFactory.create({
          id: book.id,
          authorId: book.authorId,
          edition: book.edition,
          name: book.name,
          releaseYear: book.releaseYear,
          totalPages: book.totalPages,
          availability: book.availability,
        })
      );
    });

    return bookCollection;
  }

  public static createList(props: BookCollectionModel[]): BookCollection[] {
    return props.map((bookCollectionModel: BookCollectionModel) =>
      BookCollectionFactory.create({
        id: bookCollectionModel.id,
        libraryId: bookCollectionModel.libraryId,
        theme: bookCollectionModel.theme,
        books: bookCollectionModel.books.map(
          (book: BookModel) =>
            ({
              id: book.id,
              authorId: book.authorId,
              edition: book.edition,
              name: book.name,
              releaseYear: book.releaseYear,
              totalPages: book.totalPages,
              availability: book.availability,
            } satisfies BookFactoryProps)
        ),
      })
    );
  }
}
