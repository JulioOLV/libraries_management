import Usecase from "@/modules/@shared/usecase/usecase.interface";

export type CreateBookCollectionUsecaseInputDto = {
  theme: string;
  libraryId: string;
};

export type CreateBookCollectionUsecaseOutputDto = {
  bookCollectionId: string;
};

export default interface CreateBookCollectionUsecaseInterface
  extends Usecase<
    CreateBookCollectionUsecaseInputDto,
    CreateBookCollectionUsecaseOutputDto
  > {}
