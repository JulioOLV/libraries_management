import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import LibraryRepository from "./library.repository";
import Library from "@/modules/library-adm/domain/library/entity/library.entity";
import LibraryId from "@/modules/library-adm/domain/library/value-object/library-id.value-object";
import Address from "@/modules/library-adm/domain/library/value-object/address.value-object";
import { FindAllLibrariesFilter } from "@/modules/library-adm/domain/library/typings/library.repository.typing";
import { SortFilter } from "@/modules/@shared/enums/sort.enum";
import LibraryModel from "./library.model";
import AddressLibraryModel from "./address-library.model";

describe("LibraryRepository unit test", () => {
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      logging: false,
      synchronize: true,
      dropSchema: true,
      entities: [LibraryModel, AddressLibraryModel],
    });

    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it("should create a library", async () => {
    const repository = new LibraryRepository();

    const input = new Library({
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
    input.changeAddress(address);

    await repository.createLibrary(input);

    const output = await LibraryModel.findOne({
      where: { id: input.id.value },
      relations: ["address"],
    });

    expect(output?.id).toEqual(input.id.value);
    expect(output?.name).toEqual(input.name);
    expect(output?.address.city).toEqual(input.address.city);
    expect(output?.address.district).toEqual(input.address.district);
    expect(output?.address.number).toEqual(input.address.number);
    expect(output?.address.state).toEqual(input.address.state);
    expect(output?.address.street).toEqual(input.address.street);
    expect(output?.address.zipCode).toEqual(input.address.zipCode);
  });

  it("should find a library by id", async () => {
    const repository = new LibraryRepository();

    await LibraryModel.save({
      id: "1",
      name: "Name 1",
      address: {
        id: "1",
        city: "City X",
        district: "District Y",
        number: "1000",
        state: "ST",
        street: "Street M",
        zipCode: "00000-000",
      },
    });

    const input = new LibraryId("1");

    const output = await repository.findLibraryById(input);

    expect(output.id.value).toBe("1");
    expect(output.name).toBe("Name 1");
    expect(output.address.city).toBe("City X");
    expect(output.address.district).toBe("District Y");
    expect(output.address.number).toBe("1000");
    expect(output.address.state).toBe("ST");
    expect(output.address.street).toBe("Street M");
    expect(output.address.zipCode).toBe("00000-000");
  });

  it("should find all libraries", async () => {
    const repository = new LibraryRepository();

    await LibraryModel.save({
      id: "1",
      name: "Name 1",
      address: {
        id: "1",
        city: "City X",
        district: "District Y",
        number: "1000",
        state: "ST",
        street: "Street M",
        zipCode: "00000-000",
      },
    });

    await LibraryModel.save({
      id: "2",
      name: "Name 2",
      address: {
        id: "2",
        city: "City O",
        district: "District P",
        number: "1001",
        state: "ST",
        street: "Street N",
        zipCode: "00000-001",
      },
    });

    const input: FindAllLibrariesFilter = {
      limit: 10,
      page: 1,
      sort: SortFilter.ASC,
    };

    const output = await repository.findAllLibraries(input);

    expect(output).toHaveLength(2);
  });
});
