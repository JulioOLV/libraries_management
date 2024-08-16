import Usecase from "@/modules/@shared/usecase/usecase.interface";

export type CreateLibraryUsecaseInputDto = {
  name: string;
  address: {
    city: string;
    district: string;
    number: string;
    state: string;
    street: string;
    zipCode: string;
  };
};

export type CreateLibraryUsecaseOutputDto = {
  libraryId: string;
};

export default interface CreateLibraryUsecaseInterface
  extends Usecase<
    CreateLibraryUsecaseInputDto,
    CreateLibraryUsecaseOutputDto
  > {}
