import LibraryId from "@/modules/library-adm/domain/library/value-object/library-id.value-object";
import CreateLibraryUsecase from "./create-library.usecase";
import { CreateLibraryUsecaseInputDto } from "./create-library.dto";

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
      name: "Library 1",
      address: {
        city: "City X",
        district: "District X",
        number: "10000",
        state: "ST",
        street: "Street X",
        zipCode: "00000-000",
      },
    };

    const output = await usecase.execute(input);

    expect(output.libraryId).toBe("1");
  });
});
