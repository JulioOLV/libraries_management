import Usecase from "@/modules/@shared/usecase/usecase.interface";
import { FindAllLibrariesFilter } from "@/modules/library-adm/domain/library/typings/library.repository.typing";

export type FindAllLibrariesUsecaseInputDto = {
  filters: FindAllLibrariesFilter;
};

export type FindAllLibrariesUsecaseOutputDto = {
  libraries: {
    id: string;
    name: string;
    address: string;
  }[];
};

export default interface FindAllLibrariesUsecaseInterface
  extends Usecase<
    FindAllLibrariesUsecaseInputDto,
    FindAllLibrariesUsecaseOutputDto
  > {}
