import Usecase from "@/modules/@shared/usecase/usecase.interface";

export type FindLibraryByIdUsecaseInputDto = {
  libraryId: string;
};

export type FindLibraryByIdUsecaseOutputDto = {
  libraryId: string;
  name: string;
  address: string;
};

export default interface FindLibraryByIdUsecaseInterface
  extends Usecase<
    FindLibraryByIdUsecaseInputDto,
    FindLibraryByIdUsecaseOutputDto
  > {}
