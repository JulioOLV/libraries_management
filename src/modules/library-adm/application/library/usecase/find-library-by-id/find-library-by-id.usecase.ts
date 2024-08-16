import LibraryRepositoryInterface from "@/modules/library-adm/domain/library/repository/library.repository.interface";
import FindLibraryByIdUsecaseInterface, {
  FindLibraryByIdUsecaseInputDto,
  FindLibraryByIdUsecaseOutputDto,
} from "./find-library-by-id.dto";
import LibraryId from "@/modules/library-adm/domain/library/value-object/library-id.value-object";
import Library from "@/modules/library-adm/domain/library/entity/library.entity";

export default class FindLibraryByIdUsecase
  implements FindLibraryByIdUsecaseInterface
{
  private _libraryRepository: LibraryRepositoryInterface;

  constructor(libraryRepository: LibraryRepositoryInterface) {
    this._libraryRepository = libraryRepository;
  }

  async execute(
    input: FindLibraryByIdUsecaseInputDto
  ): Promise<FindLibraryByIdUsecaseOutputDto> {
    const library = await this._libraryRepository.findLibraryById(
      new LibraryId(input.libraryId)
    );

    const output = this.mapToOutputObject(library);

    return output;
  }

  private mapToOutputObject(library: Library): FindLibraryByIdUsecaseOutputDto {
    return {
      libraryId: library.id.value,
      name: library.name,
      address: library.address.toString(),
    };
  }
}
