import { faker } from "@faker-js/faker";
import Library from "@/modules/library-adm/domain/library/entity/library.entity";
import LibraryId from "@/modules/library-adm/domain/library/value-object/library-id.value-object";
import Address from "@/modules/library-adm/domain/library/value-object/address.value-object";
import FindAllLibrariesUsecase from "./find-all-libraries.usecase";
import { FindAllLibrariesUsecaseInputDto } from "./find-all-libraries.dto";
import { SortFilter } from "@/modules/@shared/enums/sort.enum";

const library1 = new Library({
  id: new LibraryId("1"),
  name: faker.company.name(),
});
const address1 = new Address({
  city: faker.location.city(),
  district: faker.location.direction(),
  number: faker.number.int().toString(),
  state: faker.location.state({ abbreviated: true }),
  street: faker.location.street(),
  zipCode: faker.location.zipCode("#####-###"),
});
library1.changeAddress(address1);

const library2 = new Library({
  id: new LibraryId("2"),
  name: faker.company.name(),
});
const address2 = new Address({
  city: faker.location.city(),
  district: faker.location.direction(),
  number: faker.number.int().toString(),
  state: faker.location.state({ abbreviated: true }),
  street: faker.location.street(),
  zipCode: faker.location.zipCode("#####-###"),
});
library2.changeAddress(address2);

const MockRepository = () => {
  return {
    findLibraryById: jest.fn(),
    findAllLibraries: jest.fn().mockResolvedValue([library1, library2]),
    createLibrary: jest.fn(),
  };
};

describe("FindAllLibrariesUsecase unit test", () => {
  it("should return a list of libraries", async () => {
    const repository = MockRepository();
    const usecase = new FindAllLibrariesUsecase(repository);

    const input: FindAllLibrariesUsecaseInputDto = {
      filters: {
        limit: 10,
        page: 1,
        sort: SortFilter.ASC,
      },
    };

    const output = await usecase.execute(input);

    expect(output.libraries).toHaveLength(2);
  });
});
