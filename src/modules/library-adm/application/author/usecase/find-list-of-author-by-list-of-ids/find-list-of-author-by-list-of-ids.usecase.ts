import AuthorRepositoryInterface from "@/modules/library-adm/domain/author/repository/author.repository.interface";
import FindListOfAuthorByListOfIdsUsecaseInterface, {
  FindListOfAuthorByListOfIdsInputDto,
  FindListOfAuthorByListOfIdsOutputDto,
} from "./find-list-of-author-by-list-of-ids.dto";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import Author from "@/modules/library-adm/domain/author/entity/author.entity";

export default class FindListOfAuthorByListOfIdsUsecase
  implements FindListOfAuthorByListOfIdsUsecaseInterface
{
  private _authorRepository: AuthorRepositoryInterface;

  constructor(authorRepository: AuthorRepositoryInterface) {
    this._authorRepository = authorRepository;
  }

  async execute(
    input: FindListOfAuthorByListOfIdsInputDto
  ): Promise<FindListOfAuthorByListOfIdsOutputDto> {
    const authorListIds = input.authorIdList.map(
      (authorId) => new AuthorId(authorId)
    );

    const authorsInDb = await this._authorRepository.findAuthorListByIdList(
      authorListIds
    );

    const output = this.mapToOutputObject(authorsInDb);

    return output;
  }

  private mapToOutputObject(
    authorsInDb: Author[]
  ): FindListOfAuthorByListOfIdsOutputDto {
    return {
      authorList: authorsInDb.map((author: Author) => ({
        authorId: author.id.value,
        age: author.age,
        name: author.name,
      })),
    };
  }
}
