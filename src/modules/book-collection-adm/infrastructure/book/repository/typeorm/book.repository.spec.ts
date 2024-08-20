import { DataSource } from "typeorm";
import BookRepository from "./book.repository";
import Book from "@/modules/book-collection-adm/domain/book/entity/book.entity";
import BookId from "@/modules/book-collection-adm/domain/book/value-object/book-id.value-object";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import Edition from "@/modules/book-collection-adm/domain/book/value-object/edition.value-object";
import ReleaseYear from "@/modules/book-collection-adm/domain/book/value-object/release-year.value-object";
import BookModel from "./book.model";
import BookCollectionModel from "../../../book-collection/repository/typeorm/book-collection.model";
import { faker } from "@faker-js/faker";

describe("BookRepository unit test", () => {
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      logging: false,
      dropSchema: true,
      synchronize: true,
      entities: [BookModel, BookCollectionModel],
    });

    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it("should create a new book", async () => {
    const repository = new BookRepository(dataSource);

    const input = new Book({
      id: new BookId(),
      authorId: new AuthorId(),
      edition: new Edition(faker.number.int({ min: 1, max: 5 })),
      name: faker.commerce.productName(),
      releaseYear: new ReleaseYear(faker.number.int({ min: 2005, max: 2024 })),
      totalPages: faker.number.int({ min: 6, max: 500 }),
    });

    const output = await repository.registerBook(input);

    const bookInDb = await dataSource
      .getRepository(BookModel)
      .findOne({ where: { id: output.value } });

    expect(output).toEqual(input.id);
    expect(bookInDb?.id).toEqual(input.id.value);
    expect(bookInDb?.name).toEqual(input.name);
    expect(bookInDb?.authorId).toEqual(input.authorId.value);
    expect(bookInDb?.edition).toEqual(input.edition.value);
    expect(bookInDb?.releaseYear).toEqual(input.releaseYear.value);
    expect(bookInDb?.totalPages).toEqual(input.totalPages);
    expect(bookInDb?.availability).toEqual(true);
  });
});
