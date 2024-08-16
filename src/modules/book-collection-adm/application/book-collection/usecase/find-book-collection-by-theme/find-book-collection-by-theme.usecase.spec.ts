import { SortFilter } from "@/modules/@shared/enums/sort.enum";
import { FindBookCollectionByThemeInputDto } from "./find-book-collection-by-theme.dto";
import FindBookCollectionByThemeUsecase from "./find-book-collection-by-theme.usecase";
import { BookCollectionTheme } from "@/modules/book-collection-adm/domain/book-collection/enums/book-collection-theme.enums";
import BookCollection from "@/modules/book-collection-adm/domain/book-collection/entity/book-collection.entity";
import Id from "@/modules/@shared/value-object/id.value-object";
import LibraryId from "@/modules/book-collection-adm/domain/book-collection/value-object/library-id.value-object";
import Book from "@/modules/book-collection-adm/domain/book/entity/book.entity";
import BookId from "@/modules/book-collection-adm/domain/book/value-object/book-id.value-object";
import AuthorId from "@/modules/book-collection-adm/domain/book/value-object/author-id.value-object";
import Edition from "@/modules/book-collection-adm/domain/book/value-object/edition.value-object";
import ReleaseYear from "@/modules/book-collection-adm/domain/book/value-object/release-year.value-object";
import { FindListOfAuthorByListOfIdsFacadeOutputDto } from "@/modules/library-adm/domain/author/facade/author.facade.interface";

const bookCollection1 = new BookCollection({
  id: new Id("1"),
  libraryId: new LibraryId("1"),
  theme: BookCollectionTheme.Ciencias,
});

bookCollection1.addBookToCollection(
  new Book({
    id: new BookId("1"),
    authorId: new AuthorId("1"),
    edition: new Edition(1),
    name: "Book 1",
    releaseYear: new ReleaseYear(2008),
    totalPages: 100,
  })
);

bookCollection1.addBookToCollection(
  new Book({
    id: new BookId("2"),
    authorId: new AuthorId("2"),
    edition: new Edition(1),
    name: "Book 2",
    releaseYear: new ReleaseYear(2010),
    totalPages: 189,
  })
);

const bookCollections = [bookCollection1];

const MockRepository = () => {
  return {
    findAllByTheme: jest.fn().mockReturnValue(Promise.resolve(bookCollections)),
  };
};

const MockFacade = () => {
  return {
    findAuthorById: jest.fn(),
    findListOfAuthorsByListOfIds: jest.fn().mockReturnValue(
      Promise.resolve({
        authorList: [
          {
            authorId: "1",
            name: "Author 1",
            age: 20,
          },
          {
            authorId: "2",
            name: "Author 2",
            age: 40,
          },
        ],
      } as FindListOfAuthorByListOfIdsFacadeOutputDto)
    ),
  };
};

describe("FindBookCollectionByThemeUsecase unit test", () => {
  it("should return error with not found book collection by theme provided", async () => {
    expect(async () => {
      const repository = MockRepository();
      repository.findAllByTheme.mockReturnValue(Promise.resolve(null));
      const facade = MockFacade();
      const usecase = new FindBookCollectionByThemeUsecase(repository, facade);
      const input: FindBookCollectionByThemeInputDto = {
        limit: 10,
        page: 1,
        sort: SortFilter.ASC,
        theme: BookCollectionTheme.Ciencias,
      };

      return await usecase.execute(input);
    }).rejects.toThrow(
      `Not found book collections with theme ${BookCollectionTheme.Ciencias}`
    );
  });

  it("should return error with not found authors by ids provideds on book", async () => {
    expect(async () => {
      const repository = MockRepository();
      const facade = MockFacade();
      facade.findListOfAuthorsByListOfIds.mockReturnValue(
        Promise.resolve({
          authorList: [],
        } as FindListOfAuthorByListOfIdsFacadeOutputDto)
      );
      const usecase = new FindBookCollectionByThemeUsecase(repository, facade);
      const input: FindBookCollectionByThemeInputDto = {
        limit: 10,
        page: 1,
        sort: SortFilter.ASC,
        theme: BookCollectionTheme.Ciencias,
      };

      return await usecase.execute(input);
    }).rejects.toThrow(`Authors not found with ids 1,2`);
  });

  it("should return error with not found authors by ids provideds on book", async () => {
    expect(async () => {
      const repository = MockRepository();
      const facade = MockFacade();
      facade.findListOfAuthorsByListOfIds.mockReturnValue(
        Promise.resolve({
          authorList: [
            {
              authorId: "1",
              name: "Author 1",
              age: 20,
            },
          ],
        } as FindListOfAuthorByListOfIdsFacadeOutputDto)
      );
      const usecase = new FindBookCollectionByThemeUsecase(repository, facade);
      const input: FindBookCollectionByThemeInputDto = {
        limit: 10,
        page: 1,
        sort: SortFilter.ASC,
        theme: BookCollectionTheme.Ciencias,
      };

      return await usecase.execute(input);
    }).rejects.toThrow(`Author with id 2 not found.`);
  });

  it("should return a book collection list", async () => {
    const repository = MockRepository();
    const facade = MockFacade();
    const usecase = new FindBookCollectionByThemeUsecase(repository, facade);
    const input: FindBookCollectionByThemeInputDto = {
      limit: 10,
      page: 1,
      sort: SortFilter.ASC,
      theme: BookCollectionTheme.Ciencias,
    };

    const output = await usecase.execute(input);

    expect(output).toBeDefined();
    expect(output).toHaveLength(1);
    expect(output[0].bookCollectionId).toEqual("1");
    expect(output[0].libraryId).toEqual("1");
    expect(output[0].theme).toEqual(BookCollectionTheme.Ciencias);
    expect(output[0].totalAmountOfBooks).toEqual(2);
    expect(output[0].books).toHaveLength(2);
    expect(output[0].books[0].bookId).toEqual("1");
    expect(output[0].books[0].name).toEqual("Book 1");
    expect(output[0].books[0].totalPages).toEqual(100);
    expect(output[0].books[0].author.authorId).toEqual("1");
    expect(output[0].books[0].author.name).toEqual("Author 1");
    expect(output[0].books[1].bookId).toEqual("2");
    expect(output[0].books[1].name).toEqual("Book 2");
    expect(output[0].books[1].totalPages).toEqual(189);
    expect(output[0].books[1].author.authorId).toEqual("2");
    expect(output[0].books[1].author.name).toEqual("Author 2");
  });
});
