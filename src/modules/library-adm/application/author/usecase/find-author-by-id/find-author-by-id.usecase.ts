import AuthorRepositoryInterface from "@/modules/library-adm/domain/author/repository/author.repository.interface";
import {
  FindAuthorByIdInputDto,
  FindAuthorByIdOutputDto,
  FindAuthorByIdUsecaseInterface,
} from "./find-author-by-id.dto";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import Author from "@/modules/library-adm/domain/author/entity/author.entity";

export default class FindAuthorByIdUsecase
  implements FindAuthorByIdUsecaseInterface
{
  private _authorRepository: AuthorRepositoryInterface;

  constructor(authorRepository: AuthorRepositoryInterface) {
    this._authorRepository = authorRepository;
  }

  async execute(
    input: FindAuthorByIdInputDto
  ): Promise<FindAuthorByIdOutputDto> {
    const author = await this._authorRepository.findAuthorById(
      new AuthorId(input.authorId)
    );

    const output = this.mapToOuputObject(author);

    return output;
  }

  private mapToOuputObject(author: Author): FindAuthorByIdOutputDto {
    return {
      authorId: author.id.value,
      name: author.name,
      age: author.age,
    };
  }
}
