import Usecase from "@/modules/@shared/usecase/usecase.interface";

export type CreateBookUsecaseInputDto = {
  name: string;
  releaseYear: number;
  edition: number;
  authorId: string;
  totalPages: number;
};

export type CreateBookUsecaseOutputDto = {
  bookId: string;
  availability: boolean;
};

export default interface CreateBookUsecaseInterface
  extends Usecase<CreateBookUsecaseInputDto, CreateBookUsecaseOutputDto> {}
