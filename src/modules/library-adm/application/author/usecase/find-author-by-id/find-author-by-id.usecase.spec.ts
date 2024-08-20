import Author from "@/modules/library-adm/domain/author/entity/author.entity";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import Name from "@/modules/library-adm/domain/author/value-object/name.value-object";
import FindAuthorByIdUsecase from "./find-author-by-id.usecase";
import { FindAuthorByIdInputDto } from "./find-author-by-id.dto";

const authorMock = new Author({
  id: new AuthorId(),
  age: 23,
  name: new Name({
    name: "name",
    surname: "surname",
  }),
});

const MockRepository = () => {
  return {
    findAuthorById: jest.fn().mockReturnValue(Promise.resolve(authorMock)),
    findAuthorListByIdList: jest.fn(),
    createAuthor: jest.fn(),
  };
};

describe("FindAuthorByIdUsecase unit test", () => {
  it("should return a author by id", async () => {
    const repository = MockRepository();
    const usecase = new FindAuthorByIdUsecase(repository);
    const input: FindAuthorByIdInputDto = {
      authorId: authorMock.id.value,
    };

    const output = await usecase.execute(input);

    expect(output).toBeDefined();
    expect(output.authorId).toEqual(authorMock.id.value);
    expect(output.name).toEqual(authorMock.name);
    expect(output.age).toEqual(authorMock.age);
  });
});
