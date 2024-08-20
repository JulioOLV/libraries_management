import Author from "./author.entity";
import Name from "@/modules/library-adm/domain/author/value-object/name.value-object";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import { faker } from "@faker-js/faker";

describe("AuthorEntity unit tests", () => {
  it("should return an error if the age provided for the author is less than 16 years old", () => {
    expect(() => {
      const newAuthor = {
        id: new AuthorId(),
        name: new Name({
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
        }),
        age: faker.number.int({ min: 1, max: 16 }),
      };

      return new Author(newAuthor);
    }).toThrow("author: age of author must be greater than or equal to 16");
  });

  it("should create a new author", () => {
    const newAuthor = {
      id: new AuthorId(),
      name: new Name({
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
      }),
      age: faker.number.int({ min: 17, max: 50 }),
    };

    const author = new Author(newAuthor);

    expect({
      id: author.id,
      name: author.name,
      age: author.age,
    }).toMatchObject({
      id: newAuthor.id,
      name: newAuthor.name.fullName,
      age: newAuthor.age,
    });
  });
});
