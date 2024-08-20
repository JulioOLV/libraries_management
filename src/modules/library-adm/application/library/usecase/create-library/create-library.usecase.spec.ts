import LibraryId from "@/modules/library-adm/domain/library/value-object/library-id.value-object";
import CreateLibraryUsecase from "./create-library.usecase";
import { CreateLibraryUsecaseInputDto } from "./create-library.dto";
import { faker } from "@faker-js/faker";

const MockRepository = () => {
  return {
    findLibraryById: jest.fn(),
    findAllLibraries: jest.fn(),
    createLibrary: jest.fn().mockResolvedValue(new LibraryId("1")),
  };
};

describe("CreateLibraryUsecase unit test", () => {
  it("should create a library", async () => {
    const repository = MockRepository();
    const usecase = new CreateLibraryUsecase(repository);

    const input: CreateLibraryUsecaseInputDto = {
      name: faker.commerce.productName(),
      address: {
        city: faker.location.city(),
        district: faker.location.direction(),
        number: faker.number.int().toString(),
        state: faker.location.state({ abbreviated: true }),
        street: faker.location.street(),
        zipCode: faker.location.zipCode("#####-###"),
      },
    };

    const output = await usecase.execute(input);

    expect(output.libraryId).toBe("1");
  });
});
