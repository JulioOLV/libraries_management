import { BookCollectionTheme } from "@/modules/book-collection-adm/domain/book-collection/enums/book-collection-theme.enums";
import { SortFilter } from "@/modules/@shared/enums/sort.enum";

export type FindAllByThemeFilters = {
  theme: BookCollectionTheme;
  sort: SortFilters;
  limit: number;
  page: number;
};
