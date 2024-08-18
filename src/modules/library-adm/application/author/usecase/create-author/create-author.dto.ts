import Usecase from "@/modules/@shared/usecase/usecase.interface";

export type CreateAuthorUsecaseInputDto = {
  firstName: string;
  lastName: string;
  age: number;
};

export type CreateAuthorUsecaseOutputDto = {
  authorId: string;
};

export default interface CreateAuthorUsecaseInterface
  extends Usecase<CreateAuthorUsecaseInputDto, CreateAuthorUsecaseOutputDto> {}
