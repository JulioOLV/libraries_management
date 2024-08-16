import Usecase from "@/modules/@shared/usecase/usecase.interface";

export type FindListOfAuthorByListOfIdsInputDto = {
  authorIdList: string[];
};

export type FindListOfAuthorByListOfIdsOutputDto = {
  authorList: {
    authorId: string;
    name: string;
    age: number;
  }[];
};

export default interface FindListOfAuthorByListOfIdsUsecaseInterface
  extends Usecase<
    FindListOfAuthorByListOfIdsInputDto,
    FindListOfAuthorByListOfIdsOutputDto
  > {}
