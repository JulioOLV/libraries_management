export type FindListOfAuthorByListOfIdsFacadeOutputDto = {
  authorList: AuthorDetail[];
};

export type AuthorDetail = {
  authorId: string;
  name: string;
  age: number;
};
