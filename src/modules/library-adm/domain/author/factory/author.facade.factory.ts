import AuthorRepository from "@/modules/library-adm/infrastructure/author/repository/typeorm/author.repository";
import AuthorFacade, { AuthorFacadeProps } from "../facade/author.facade";
import FindAuthorByIdUsecase from "@/modules/library-adm/application/author/usecase/find-author-by-id/find-author-by-id.usecase";
import FindListOfAuthorByListOfIdsUsecase from "@/modules/library-adm/application/author/usecase/find-list-of-author-by-list-of-ids/find-list-of-author-by-list-of-ids.usecase";

export default class AuthorFacadeFactory {
  static create(): AuthorFacade {
    const authorRepository = new AuthorRepository();
    const findAuthorByIdUsecase = new FindAuthorByIdUsecase(authorRepository);
    const findListOfAuthorsByListOfIdsUsecase =
      new FindListOfAuthorByListOfIdsUsecase(authorRepository);

    const facadeProps: AuthorFacadeProps = {
      findAuthorByIdUsecase,
      findListOfAuthorsByListOfIdsUsecase,
    };

    const facade = new AuthorFacade(facadeProps);

    return facade;
  }
}
