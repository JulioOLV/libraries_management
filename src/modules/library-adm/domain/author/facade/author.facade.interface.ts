export type FindAuthorByIdFacadeInputDto = {
  authorId: string;
};

export type FindAuthorByIdFacadeOutputDto = {
  authorId: string;
  name: string;
  age: number;
};

export type FindListOfAuthorByListOfIdsFacadeInputDto = {
  authorIdList: string[];
};

export type FindListOfAuthorByListOfIdsFacadeOutputDto = {
  authorList: {
    authorId: string;
    name: string;
    age: number;
  }[];
};

export default interface AuthorFacadeInterface {
  findAuthorById(
    input: FindAuthorByIdFacadeInputDto
  ): Promise<FindAuthorByIdFacadeOutputDto>;

  findListOfAuthorsByListOfIds(
    input: FindListOfAuthorByListOfIdsFacadeInputDto
  ): Promise<FindListOfAuthorByListOfIdsFacadeOutputDto>;
}
