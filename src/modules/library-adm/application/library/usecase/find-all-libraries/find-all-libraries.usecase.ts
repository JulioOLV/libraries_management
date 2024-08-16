import LibraryRepositoryInterface from "@/modules/library-adm/domain/library/repository/library.repository.interface";
import FindAllLibrariesUsecaseInterface, {
  FindAllLibrariesUsecaseInputDto,
  FindAllLibrariesUsecaseOutputDto,
} from "./find-all-libraries.dto";
import Library from "@/modules/library-adm/domain/library/entity/library.entity";

export default class FindAllLibrariesUsecase
  implements FindAllLibrariesUsecaseInterface
{
  private _repository: LibraryRepositoryInterface;

  constructor(repository: LibraryRepositoryInterface) {
    this._repository = repository;
  }

  async execute(
    input: FindAllLibrariesUsecaseInputDto
  ): Promise<FindAllLibrariesUsecaseOutputDto> {
    const librariesInDb = await this._repository.findAllLibraries(
      input.filters
    );

    return this.mapToOutputObject(librariesInDb);
  }

  private mapToOutputObject(
    librariesInDb: Library[]
  ): FindAllLibrariesUsecaseOutputDto {
    const output = librariesInDb.map((library) => ({
      id: library.id.value,
      name: library.name,
      address: library.address.toString(),
    }));

    return {
      libraries: output,
    };
  }
}
