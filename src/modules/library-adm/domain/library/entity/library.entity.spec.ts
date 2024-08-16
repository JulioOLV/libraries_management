import { faker } from "@faker-js/faker";
import Address from "../value-object/address.value-object";
import LibraryId from "../value-object/library-id.value-object";
import Library from "./library.entity";

describe("LibraryEntity unit test", () => {
  it("should return error when not provide name", () => {
    expect(() => {
      return new Library({
        name: "",
      });
    }).toThrow(`library: name is required`);
  });

  it("should create a new library", () => {
    const name = faker.person.fullName();
    const library = new Library({
      id: new LibraryId("1"),
      name,
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

    expect(library.id.value).toEqual("1");
    expect(library.name).toEqual(name);
    expect(library.address).toMatchObject(address);
  });
});
