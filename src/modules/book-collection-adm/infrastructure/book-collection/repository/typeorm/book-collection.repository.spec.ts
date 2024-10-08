import "reflect-metadata";

import { DataSource } from "typeorm";

import BookCollectionRepository from "./book-collection.repository";
import { BookCollectionTheme } from "@/modules/book-collection-adm/domain/book-collection/enums/book-collection-theme.enums";
import AuthorId from "@/modules/book-collection-adm/domain/book/value-object/author-id.value-object";
import LibraryId from "@/modules/book-collection-adm/domain/book-collection/value-object/library-id.value-object";
import BookId from "@/modules/book-collection-adm/domain/book/value-object/book-id.value-object";
import { SortFilter } from "@/modules/@shared/enums/sort.enum";
import BookCollectionId from "@/modules/book-collection-adm/domain/book-collection/value-object/book-collection-id.value-object";
import BookCollectionModel from "./book-collection.model";
import BookModel from "../../../book/repository/typeorm/book.model";
import BookCollection from "@/modules/book-collection-adm/domain/book-collection/entity/book-collection.entity";
import { faker } from "@faker-js/faker";

describe("BookCollectionRepository unit test", () => {
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      logging: false,
      dropSchema: true,
      entities: [BookCollectionModel, BookModel],
    });
    await dataSource.initialize();
  });

  afterEach(async () => {
    return await dataSource.destroy();
  });

  it("should find all book collections", async () => {
    const repository = new BookCollectionRepository();

    const authorId = new AuthorId();
    const libraryId = new LibraryId();

    const bookId = new BookId();
    await dataSource.getRepository<BookModel>(BookModel).save({
      id: bookId.value,
      authorId: authorId.value,
      edition: faker.number.int({ min: 1, max: 5 }),
      name: faker.commerce.productName(),
      releaseYear: faker.number.int({ min: 2005, max: 2024 }),
      totalPages: faker.number.int({ min: 6, max: 500 }),
      availability: true,
    });

    const bookId2 = new BookId();
    await dataSource.getRepository<BookModel>(BookModel).save({
      id: bookId2.value,
      authorId: authorId.value,
      edition: faker.number.int({ min: 1, max: 5 }),
      name: faker.commerce.productName(),
      releaseYear: faker.number.int({ min: 2005, max: 2024 }),
      totalPages: faker.number.int({ min: 6, max: 500 }),
      availability: false,
    });

    await dataSource
      .getRepository<BookCollectionModel>(BookCollectionModel)
      .save({
        id: new BookCollectionId().value,
        theme: BookCollectionTheme.Ciencias,
        libraryId: libraryId.value,
        books: [
          {
            id: bookId.value,
          },
          {
            id: bookId2.value,
          },
        ],
      });

    const results = await repository.findAllByTheme({
      limit: 1,
      page: 1,
      sort: SortFilter.DESC,
      theme: BookCollectionTheme.Ciencias,
    });

    expect(results).toHaveLength(1);
  });

  it("should create a new book collection", async () => {
    const repository = new BookCollectionRepository();
    const bookCollection = new BookCollection({
      id: new BookCollectionId("1"),
      libraryId: new LibraryId("1"),
      theme: BookCollectionTheme.Ciencias,
    });

    await repository.createNewBookCollection(bookCollection);

    const bookCollectionInDb = await BookCollectionModel.findOne({
      where: { id: "1" },
    });

    expect(bookCollectionInDb?.id).toBe("1");
    expect(bookCollectionInDb?.libraryId).toBe("1");
    expect(bookCollectionInDb?.theme).toBe(BookCollectionTheme.Ciencias);
    expect(bookCollectionInDb?.books).toBe(undefined);
  });
});
