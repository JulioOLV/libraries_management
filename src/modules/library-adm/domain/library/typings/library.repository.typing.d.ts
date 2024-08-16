import { SortFilter } from "@/modules/@shared/enums/sort.enum";

export type FindAllLibrariesFilter = {
  sort: SortFilter;
  limit: number;
  page: number;
};
