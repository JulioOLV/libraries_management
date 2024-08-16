import {
  FindAuthorByIdFacadeInputDto,
  FindListOfAuthorByListOfIdsFacadeInputDto,
} from "./author.facade.interface";
import AuthorFacadeFactory from "../factory/author.facade.factory";
import { DataSource } from "typeorm";
import AuthorModel from "@/modules/library-adm/infrastructure/author/repository/typeorm/author.model";

describe("AuthorFacade unit test", () => {
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      logging: false,
      dropSchema: true,
      synchronize: true,
      entities: [AuthorModel],
    });

    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it("should return a author by id", async () => {
    const facade = AuthorFacadeFactory.create();

    await AuthorModel.save({
      id: "1",
      age: 23,
      name: "name",
      surname: "surname",
    });

    const input: FindAuthorByIdFacadeInputDto = {
      authorId: "1",
    };

    const output = await facade.findAuthorById(input);

    expect(output).toBeDefined();
    expect(output.authorId).toEqual("1");
    expect(output.age).toEqual(23);
    expect(output.name).toEqual("name surname");
  });

  it("should return a list of author by lis of ids", async () => {
    const facade = AuthorFacadeFactory.create();

    await AuthorModel.save({
      id: "1",
      age: 23,
      name: "name",
      surname: "surname",
    });

    await AuthorModel.save({
      id: "2",
      age: 32,
      name: "name 2",
      surname: "surname 2",
    });

    const input: FindListOfAuthorByListOfIdsFacadeInputDto = {
      authorIdList: ["1", "2"],
    };

    const output = await facade.findListOfAuthorsByListOfIds(input);

    expect(output).toBeDefined();
    expect(output.authorList).toHaveLength(2);
    expect(output.authorList[0].authorId).toEqual("1");
    expect(output.authorList[0].age).toEqual(23);
    expect(output.authorList[0].name).toEqual("name surname");
    expect(output.authorList[1].authorId).toEqual("2");
    expect(output.authorList[1].age).toEqual(32);
    expect(output.authorList[1].name).toEqual("name 2 surname 2");
  });
});
