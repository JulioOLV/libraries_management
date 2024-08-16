import { faker } from "@faker-js/faker";
import Library from "@/modules/library-adm/domain/library/entity/library.entity";
import LibraryId from "@/modules/library-adm/domain/library/value-object/library-id.value-object";
import FindLibraryByIdUsecase from "./find-library-by-id.usecase";
import { FindLibraryByIdUsecaseInputDto } from "./find-library-by-id.dto";
import Address from "@/modules/library-adm/domain/library/value-object/address.value-object";

const library = new Library({
  id: new LibraryId("1"),
  name: faker.company.name(),
});

const address = new Address({
  city: faker.location.city(),
  district: faker.location.direction(),
  number: faker.number.int().toString(),
  state: faker.location.state({ abbreviated: true }),
  street: faker.location.street(),
  zipCode: faker.location.zipCode("#####-###"),
});

library.changeAddress(address);

const MockRepository = () => {
  return {
    findLibraryById: jest.fn().mockResolvedValue(library),
    findAllLibraries: jest.fn(),
    createLibrary: jest.fn(),
  };
};

describe("FindLibraryByIdUsecase unit test", () => {
  it("should return a library detail", async () => {
    const repository = MockRepository();
    const usecase = new FindLibraryByIdUsecase(repository);
    const input: FindLibraryByIdUsecaseInputDto = {
      libraryId: "1",
    };

    const output = await usecase.execute(input);

    expect(output).toBeDefined();
    expect(output.name).toEqual(library.name);
    expect(output.libraryId).toEqual(library.id.value);
    expect(output.address).toEqual(library.address.toString());
  });
});
