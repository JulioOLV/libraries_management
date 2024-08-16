import { SortFilter } from "@/modules/@shared/enums/sort.enum";
import Usecase from "@/modules/@shared/usecase/usecase.interface";
import { BookCollectionTheme } from "@/modules/book-collection-adm/domain/book-collection/enums/book-collection-theme.enums";

export type FindBookCollectionByThemeInputDto = {
  theme: BookCollectionTheme;
  limit: number;
  sort: SortFilter;
  page: number;
};

export type FindBookCollectionByThemeOutputDto = {
  bookCollectionId: string;
  books: {
    bookId: string;
    name: string;
    totalPages: number;
    author: {
      authorId: string;
      name: string;
    };
  }[];
  theme: string;
  libraryId: string;
  totalAmountOfBooks: number;
};

export default interface FindBookCollectionByThemeUsecaseInterface
  extends Usecase<
    FindBookCollectionByThemeInputDto,
    FindBookCollectionByThemeOutputDto[]
  > {}
