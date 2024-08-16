import Usecase from "@/modules/@shared/usecase/usecase.interface";

export type FindAuthorByIdInputDto = {
  authorId: string;
};

export type FindAuthorByIdOutputDto = {
  authorId: string;
  name: string;
  age: number;
};

export interface FindAuthorByIdUsecaseInterface
  extends Usecase<FindAuthorByIdInputDto, FindAuthorByIdOutputDto> {}
