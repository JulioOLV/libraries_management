import BookCollectionModel from "@/infrastructure/book-collection/model/typeorm/book-collection.model";
import BookCollection from "@/modules/book-collection-adm/domain/book-collection/entity/book-collection.entity";
import BookCollectionFactory from "@/modules/book-collection-adm/domain/book-collection/factory/book-collection.factory";
import BookCollectionRepositoryInterface from "@/modules/book-collection-adm/domain/book-collection/repository/book-collection.repository.interface";
import { FindAllByThemeFilters } from "@/modules/book-collection-adm/domain/book-collection/typings/book-collection.repository.filters";

export default class BookCollectionRepository
  implements BookCollectionRepositoryInterface
{
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
