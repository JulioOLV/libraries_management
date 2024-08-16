import { FindAuthorByIdUsecaseInterface } from "@/modules/library-adm/application/author/usecase/find-author-by-id/find-author-by-id.dto";
import AuthorFacadeInterface, {
  FindAuthorByIdFacadeInputDto,
  FindAuthorByIdFacadeOutputDto,
  FindListOfAuthorByListOfIdsFacadeInputDto,
  FindListOfAuthorByListOfIdsFacadeOutputDto,
} from "./author.facade.interface";
import FindListOfAuthorByListOfIdsUsecase from "@/modules/library-adm/application/author/usecase/find-list-of-author-by-list-of-ids/find-list-of-author-by-list-of-ids.usecase";

export type AuthorFacadeProps = {
  findAuthorByIdUsecase: FindAuthorByIdUsecaseInterface;
  findListOfAuthorsByListOfIdsUsecase: FindListOfAuthorByListOfIdsUsecase;
};

export default class AuthorFacade implements AuthorFacadeInterface {
  private _findAuthorByIdUsecase: FindAuthorByIdUsecaseInterface;
  private _findListOfAuthorsByListOfIdsUsecase: FindListOfAuthorByListOfIdsUsecase;

  constructor(props: AuthorFacadeProps) {
    this._findAuthorByIdUsecase = props.findAuthorByIdUsecase;
    this._findListOfAuthorsByListOfIdsUsecase =
      props.findListOfAuthorsByListOfIdsUsecase;
  }

  async findListOfAuthorsByListOfIds(
    input: FindListOfAuthorByListOfIdsFacadeInputDto
  ): Promise<FindListOfAuthorByListOfIdsFacadeOutputDto> {
    return await this._findListOfAuthorsByListOfIdsUsecase.execute(input);
  }

  async findAuthorById(
    input: FindAuthorByIdFacadeInputDto
  ): Promise<FindAuthorByIdFacadeOutputDto> {
    return await this._findAuthorByIdUsecase.execute(input);
  }
}
