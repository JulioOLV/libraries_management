import BookCollectionId from "@/modules/book-collection-adm/domain/book-collection/value-object/book-collection-id.value-object";
import CreateBookCollectionUsecase from "./create-book-collection.usecase";
import { CreateBookCollectionUsecaseInputDto } from "./create-book-collection.dto";
import { BookCollectionTheme } from "@/modules/book-collection-adm/domain/book-collection/enums/book-collection-theme.enums";

const bookCollectionId = new BookCollectionId("1");
const MockRepository = () => {
  return {
    findAllByTheme: jest.fn(),
    createNewBookCollection: jest.fn().mockResolvedValue(bookCollectionId),
  };
};

describe("CreateBookCollectionUsecase unit tests", () => {
  it("should create a new book collection", async () => {
    const repository = MockRepository();
    const usecase = new CreateBookCollectionUsecase(repository);

    const input: CreateBookCollectionUsecaseInputDto = {
      libraryId: "1",
      theme: BookCollectionTheme.Ciencias,
    };

    const output = await usecase.execute(input);

    expect(output.bookCollectionId).toBe("1");
  });
});
