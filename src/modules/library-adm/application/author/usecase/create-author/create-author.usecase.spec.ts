import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import { CreateAuthorUsecaseInputDto } from "./create-author.dto";
import { faker } from "@faker-js/faker";
import CreateAuthorUsecase from "./create-author.usecase";

const MockRepository = () => {
  return {
    findAuthorById: jest.fn(),
    findAuthorListByIdList: jest.fn(),
    createAuthor: jest.fn().mockResolvedValue(new AuthorId("1")),
  };
};

describe("CreateAuthorUsecase unit tests", () => {
  it("should create a new author", async () => {
    const repository = MockRepository();
    const usecase = new CreateAuthorUsecase(repository);

    const input: CreateAuthorUsecaseInputDto = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 20, max: 90 }),
    };

    const output = await usecase.execute(input);

    expect(output.authorId).toBe("1");
  });
});
