import BookCollection from "@/modules/book-collection-adm/domain/book-collection/entity/book-collection.entity";
import BookCollectionFactory from "@/modules/book-collection-adm/domain/book-collection/factory/book-collection.factory";
import BookCollectionRepositoryInterface from "@/modules/book-collection-adm/domain/book-collection/repository/book-collection.repository.interface";
import { FindAllByThemeFilters } from "@/modules/book-collection-adm/domain/book-collection/typings/book-collection.repository.filters";
import BookCollectionModel from "./book-collection.model";
import BookCollectionId from "@/modules/book-collection-adm/domain/book-collection/value-object/book-collection-id.value-object";

export default class BookCollectionRepository
  implements BookCollectionRepositoryInterface
{
  async createNewBookCollection(
    entity: BookCollection
  ): Promise<BookCollectionId> {
    await BookCollectionModel.save({
      id: entity.id.value,
      libraryId: entity.libraryId.value,
      theme: entity.theme,
    });

    return new BookCollectionId(entity.id.value);
  }

  async findAllByTheme(
    filters: FindAllByThemeFilters
  ): Promise<BookCollection[]> {
    const bookCollectionList = await BookCollectionModel.find({
      where: {
        theme: filters.theme,
      },
      relations: {
        books: true,
      },
      order: {
        books: {
          name: filters.sort,
        },
      },
      skip: filters.page - 1,
      take: filters.limit,
    });

    return BookCollectionFactory.createList(bookCollectionList);
  }
}
