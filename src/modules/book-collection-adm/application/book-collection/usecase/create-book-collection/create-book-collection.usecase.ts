import BookCollectionRepositoryInterface from "@/modules/book-collection-adm/domain/book-collection/repository/book-collection.repository.interface";
import CreateBookCollectionUsecaseInterface, {
  CreateBookCollectionUsecaseInputDto,
  CreateBookCollectionUsecaseOutputDto,
} from "./create-book-collection.dto";
import BookCollection from "@/modules/book-collection-adm/domain/book-collection/entity/book-collection.entity";
import { BookCollectionTheme } from "@/modules/book-collection-adm/domain/book-collection/enums/book-collection-theme.enums";
import LibraryId from "@/modules/book-collection-adm/domain/book-collection/value-object/library-id.value-object";

export default class CreateBookCollectionUsecase
  implements CreateBookCollectionUsecaseInterface
{
  private _repository: BookCollectionRepositoryInterface;

  constructor(repository: BookCollectionRepositoryInterface) {
    this._repository = repository;
  }

  async execute(
    input: CreateBookCollectionUsecaseInputDto
  ): Promise<CreateBookCollectionUsecaseOutputDto> {
    const bookCollection = new BookCollection({
      libraryId: new LibraryId(input.libraryId),
      theme: input.theme as BookCollectionTheme,
    });

    await this._repository.createNewBookCollection(bookCollection);

    return this.mapToOuputObject(bookCollection);
  }

  private mapToOuputObject(
    bookCollection: BookCollection
  ): CreateBookCollectionUsecaseOutputDto {
    return {
      bookCollectionId: bookCollection.id.value,
    };
  }
}
