import BookCollection from "../entity/book-collection.entity";
import { FindAllByThemeFilters } from "../typings/book-collection.repository.filters";
import BookCollectionId from "../value-object/book-collection-id.value-object";

export default interface BookCollectionRepositoryInterface {
  findAllByTheme(filters: FindAllByThemeFilters): Promise<BookCollection[]>;
  createNewBookCollection(entity: BookCollection): Promise<BookCollectionId>;
}
