import Author from "@/modules/library-adm/domain/author/entity/author.entity";
import CreateAuthorUsecaseInterface, {
  CreateAuthorUsecaseInputDto,
  CreateAuthorUsecaseOutputDto,
} from "./create-author.dto";
import AuthorRepositoryInterface from "@/modules/library-adm/domain/author/repository/author.repository.interface";
import Name from "@/modules/library-adm/domain/author/value-object/name.value-object";

export default class CreateAuthorUsecase
  implements CreateAuthorUsecaseInterface
{
  private _repository: AuthorRepositoryInterface;

  constructor(repository: AuthorRepositoryInterface) {
    this._repository = repository;
  }

  async execute(
    input: CreateAuthorUsecaseInputDto
  ): Promise<CreateAuthorUsecaseOutputDto> {
    const author = new Author({
      name: new Name({
        name: input.firstName,
        surname: input.lastName,
      }),
      age: input.age,
    });

    const result = await this._repository.createAuthor(author);

    return {
      authorId: result.value,
    };
  }
}
