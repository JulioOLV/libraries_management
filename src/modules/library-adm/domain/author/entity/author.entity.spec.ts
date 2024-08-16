import Author from "./author.entity";
import Name from "@/modules/library-adm/domain/author/value-object/name.value-object";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";

describe("AuthorEntity unit tests", () => {
  it("should return an error if the age provided for the author is less than 16 years old", () => {
    expect(() => {
      const newAuthor = {
        id: new AuthorId(),
        name: new Name({ name: "John", surname: "Doe" }),
        age: 10,
      };

      return new Author(newAuthor);
    }).toThrow("author: age of author must be greater than or equal to 16");
  });

  it("should create a new author", () => {
    const newAuthor = {
      id: new AuthorId(),
      name: new Name({ name: "John", surname: "Doe" }),
      age: 30,
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
