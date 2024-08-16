import Author from "@/modules/library-adm/domain/author/entity/author.entity";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import Name from "@/modules/library-adm/domain/author/value-object/name.value-object";
import FindListOfAuthorByListOfIdsUsecase from "./find-list-of-author-by-list-of-ids.usecase";
import { FindListOfAuthorByListOfIdsInputDto } from "./find-list-of-author-by-list-of-ids.dto";

const authors = [
  new Author({
    id: new AuthorId("1"),
    age: 23,
    name: new Name({ name: "name", surname: "surname" }),
  }),
  new Author({
    id: new AuthorId("2"),
    age: 32,
    name: new Name({ name: "name 2", surname: "surname 2" }),
  }),
];

const MockRepository = () => {
  return {
    findAuthorById: jest.fn(),
    findAuthorListByIdList: jest.fn().mockReturnValue(Promise.resolve(authors)),
  };
};

describe("FindListOfAuthorByListOfIdsUsecase unit test", () => {
  it("should return a list of authors by list of ids", async () => {
    const repository = MockRepository();
    const usecase = new FindListOfAuthorByListOfIdsUsecase(repository);
    const input: FindListOfAuthorByListOfIdsInputDto = {
      authorIdList: ["1", "2"],
    };

    const output = await usecase.execute(input);

    expect(output).toBeDefined();
    expect(output.authorList).toHaveLength(2);
    expect(output.authorList[0].authorId).toEqual(authors[0].id.value);
    expect(output.authorList[0].name).toEqual(authors[0].name);
    expect(output.authorList[0].age).toEqual(authors[0].age);
    expect(output.authorList[1].authorId).toEqual(authors[1].id.value);
    expect(output.authorList[1].name).toEqual(authors[1].name);
    expect(output.authorList[1].age).toEqual(authors[1].age);
  });
});
