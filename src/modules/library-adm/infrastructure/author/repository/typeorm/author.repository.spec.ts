import { DataSource } from "typeorm";
import AuthorRepository from "./author.repository";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import AuthorModel from "./author.model";

describe("AuthorRepository unit tests", () => {
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      logging: false,
      synchronize: true,
      dropSchema: true,
      entities: [AuthorModel],
    });

    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it("should return a exception when not found a author", async () => {
    expect(async () => {
      const repository = new AuthorRepository();
      return await repository.findAuthorById(new AuthorId("333"));
    }).rejects.toThrow(
      "AuthorNotFoundError: author with id 333 not found in database."
    );
  });

  it("should return a author by id", async () => {
    const repository = new AuthorRepository();

    const authorId = new AuthorId();
    await dataSource.getRepository(AuthorModel).save({
      id: authorId.value,
      age: 23,
      name: "name author",
      surname: "surname author",
    });

    const author = await repository.findAuthorById(authorId);

    expect(author.id.value).toEqual(authorId.value);
    expect(author.age).toEqual(23);
    expect(author.name).toEqual("name author surname author");
  });

  it("should return a exception when not found a author by id list", async () => {
    expect(async () => {
      const repository = new AuthorRepository();
      return await repository.findAuthorListByIdList([
        new AuthorId("333"),
        new AuthorId("111"),
      ]);
    }).rejects.toThrow(
      "AuthorListNotFoundError: author with id 333,111 not found in database."
    );
  });

  it("should return a list of author by list of ids", async () => {
    const repository = new AuthorRepository();

    const authorId1 = new AuthorId("1");
    await dataSource.getRepository(AuthorModel).save({
      id: authorId1.value,
      age: 23,
      name: "name author",
      surname: "surname author",
    });

    const authorId2 = new AuthorId("2");
    await dataSource.getRepository(AuthorModel).save({
      id: authorId2.value,
      age: 30,
      name: "name author 2",
      surname: "surname author 2",
    });

    const authorList = await repository.findAuthorListByIdList([
      authorId1,
      authorId2,
    ]);

    expect(authorList).toHaveLength(2);
    expect(authorList[0].id.value).toEqual(authorId1.value);
    expect(authorList[0].age).toEqual(23);
    expect(authorList[0].name).toEqual("name author surname author");

    expect(authorList[1].id.value).toEqual(authorId2.value);
    expect(authorList[1].age).toEqual(30);
    expect(authorList[1].name).toEqual("name author 2 surname author 2");
  });
});
