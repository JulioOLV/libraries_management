import { faker } from "@faker-js/faker";
import Address from "./address.value-object";

describe("AddressValueObject unit test", () => {
  it("should return error when not pass street property", () => {
    expect(() => {
      new Address({
        city: faker.location.city(),
        district: faker.location.direction(),
        number: faker.number.int().toString(),
        state: faker.location.state(),
        street: "",
        zipCode: faker.location.zipCode(),
      });
    }).toThrow(`address: street is required`);
  });

  it("should return error when not pass district", () => {
    expect(() => {
      new Address({
        city: faker.location.city(),
        district: "",
        number: faker.number.int().toString(),
        state: faker.location.state(),
        street: faker.location.street(),
        zipCode: faker.location.zipCode(),
      });
    }).toThrow(`address: district is required`);
  });

  it("should return error when not pass number", () => {
    expect(() => {
      new Address({
        city: faker.location.city(),
        district: faker.location.direction(),
        number: "",
        state: faker.location.state(),
        street: faker.location.street(),
        zipCode: faker.location.zipCode(),
      });
    }).toThrow(`address: number is required`);
  });

  it("should return error when not pass city", () => {
    expect(() => {
      new Address({
        city: "",
        district: faker.location.direction(),
        number: faker.number.int().toString(),
        state: faker.location.state(),
        street: faker.location.street(),
        zipCode: faker.location.zipCode(),
      });
    }).toThrow(`address: city is required`);
  });

  it("should return error when not pass state", () => {
    expect(() => {
      new Address({
        city: faker.location.city(),
        district: faker.location.direction(),
        number: faker.number.int().toString(),
        state: "",
        street: faker.location.street(),
        zipCode: faker.location.zipCode(),
      });
    }).toThrow(`address: state is required`);
  });

  it("should return error when pass state greather than 2", () => {
    expect(() => {
      new Address({
        city: faker.location.city(),
        district: faker.location.direction(),
        number: faker.number.int().toString(),
        state: faker.location.state() + "D",
        street: faker.location.street(),
        zipCode: faker.location.zipCode(),
      });
    }).toThrow(`address: state must be not bigger than 2`);
  });

  it("should return error when not pass zipCode", () => {
    expect(() => {
      new Address({
        city: faker.location.city(),
        district: faker.location.direction(),
        number: faker.number.int().toString(),
        state: faker.location.state(),
        street: faker.location.street(),
        zipCode: "",
      });
    }).toThrow(`address: zipCode is required`);
  });

  it("should return error when pass zipCode greather than 9", () => {
    expect(() => {
      new Address({
        city: faker.location.city(),
        district: faker.location.direction(),
        number: faker.number.int().toString(),
        state: faker.location.state(),
        street: faker.location.street(),
        zipCode: "000000000000000",
      });
    }).toThrow(`address: zipCode must not bigger than 9`);
  });
});
