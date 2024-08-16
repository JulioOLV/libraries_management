import BookModel from "@/infrastructure/book/model/typeorm/book.model";
import Book from "@/modules/book-collection-adm/domain/book/entity/book.entity";
import { BookRepositoryInterface } from "@/modules/book-collection-adm/domain/book/repository/book.repository.interface";
import BookId from "@/modules/book-collection-adm/domain/book/value-object/book-id.value-object";
import { DataSource } from "typeorm";

export default class BookRepository implements BookRepositoryInterface {
  private _dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this._dataSource = dataSource;
  }

  async registerBook(input: Book): Promise<BookId> {
    await this._dataSource.getRepository(BookModel).insert({
      id: input.id.value,
      authorId: input.authorId.value,
      edition: input.edition.value,
      name: input.name,
      releaseYear: input.releaseYear.value,
      totalPages: input.totalPages,
    });

    return new BookId(input.id.value);
  }
}
