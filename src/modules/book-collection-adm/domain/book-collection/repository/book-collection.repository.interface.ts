import BookCollection from "../entity/book-collection.entity";
import { FindAllByThemeFilters } from "../typings/book-collection.repository.filters";

export default interface BookCollectionRepositoryInterface {
  findAllByTheme(filters: FindAllByThemeFilters): Promise<BookCollection[]>;
}
