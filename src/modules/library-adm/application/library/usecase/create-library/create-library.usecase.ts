import Library from "@/modules/library-adm/domain/library/entity/library.entity";
import CreateLibraryUsecaseInterface, {
  CreateLibraryUsecaseInputDto,
  CreateLibraryUsecaseOutputDto,
} from "./create-library.dto";
import LibraryRepositoryInterface from "@/modules/library-adm/domain/library/repository/library.repository.interface";
import Address from "@/modules/library-adm/domain/library/value-object/address.value-object";
import LibraryId from "@/modules/library-adm/domain/library/value-object/library-id.value-object";

export default class CreateLibraryUsecase
  implements CreateLibraryUsecaseInterface
{
  private _repository: LibraryRepositoryInterface;

  constructor(repository: LibraryRepositoryInterface) {
    this._repository = repository;
  }

  async execute(
    input: CreateLibraryUsecaseInputDto
  ): Promise<CreateLibraryUsecaseOutputDto> {
    const library = this.createLibraryEntity(input);

    const result = await this._repository.createLibrary(library);

    return this.mapToOutputObject(result);
  }

  private createLibraryEntity(input: CreateLibraryUsecaseInputDto): Library {
    const library = new Library({
      name: input.name,
    });
    const address = new Address({
      city: input.address.city,
      district: input.address.district,
      number: input.address.number,
      state: input.address.state,
      street: input.address.street,
      zipCode: input.address.zipCode,
    });

    library.changeAddress(address);

    return library;
  }

  private mapToOutputObject(id: LibraryId): CreateLibraryUsecaseOutputDto {
    return {
      libraryId: id.value,
    };
  }
}
