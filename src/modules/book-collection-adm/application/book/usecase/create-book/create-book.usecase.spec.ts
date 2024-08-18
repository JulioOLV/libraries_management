import { faker } from "@faker-js/faker";
import BookId from "@/modules/book-collection-adm/domain/book/value-object/book-id.value-object";
import { CreateBookUsecaseInputDto } from "./create-book.dto";
import CreateBookUsecase from "./create-book.usecase";

const MockRepository = () => {
  return {
    registerBook: jest.fn().mockResolvedValue(new BookId("1")),
  };
};

describe("CreateBookUsecase unit tests", () => {
  it("should create a new book", async () => {
    const repository = MockRepository();
    const usecase = new CreateBookUsecase(repository);

    const input: CreateBookUsecaseInputDto = {
      name: faker.lorem.text(),
      authorId: faker.string.uuid(),
      edition: faker.number.int(),
      releaseYear: faker.date.anytime().getDate(),
      totalPages: faker.number.int({ min: 150, max: 300 }),
    };

    const output = await usecase.execute(input);

    expect(output.bookId).toBeDefined();
    expect(output.availability).toBeTruthy();
  });
});
