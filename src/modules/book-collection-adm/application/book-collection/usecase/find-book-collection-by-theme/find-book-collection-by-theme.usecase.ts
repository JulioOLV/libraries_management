import BookCollectionRepositoryInterface from "@/modules/book-collection-adm/domain/book-collection/repository/book-collection.repository.interface";
import FindBookCollectionByThemeUsecaseInterface, {
  FindBookCollectionByThemeInputDto,
  FindBookCollectionByThemeOutputDto,
} from "./find-book-collection-by-theme.dto";

import Book from "@/modules/book-collection-adm/domain/book/entity/book.entity";
import { FindListOfAuthorByListOfIdsFacadeOutputDto } from "@/modules/book-collection-adm/domain/book-collection/typings/book-collection.facade";
import AuthorFacadeInterface from "@/modules/library-adm/domain/author/facade/author.facade.interface";
import AuthorNotFoundByIdError from "@/modules/book-collection-adm/domain/book-collection/error/author-not-found-by-id.error";
import NotFoundBookCollectionWithThemeError from "@/modules/book-collection-adm/domain/book-collection/error/not-found-book-collections-with-theme.error";
import AuthorsNotFoundWithIdsError from "@/modules/book-collection-adm/domain/book-collection/error/authors-not-found-with-ids.error";

export default class FindBookCollectionByThemeUsecase
  implements FindBookCollectionByThemeUsecaseInterface
{
  private _bookCollectionRepository: BookCollectionRepositoryInterface;
  private _authorFacade: AuthorFacadeInterface;

  constructor(
    bookCollectionRepository: BookCollectionRepositoryInterface,
    authorFacade: AuthorFacadeInterface
  ) {
    this._bookCollectionRepository = bookCollectionRepository;
    this._authorFacade = authorFacade;
  }

  async execute(
    input: FindBookCollectionByThemeInputDto
  ): Promise<FindBookCollectionByThemeOutputDto[]> {
    try {
      let output: FindBookCollectionByThemeOutputDto[] = [];

      const bookCollectionList =
        await this._bookCollectionRepository.findAllByTheme({
          limit: input.limit,
          page: input.page,
          sort: input.sort,
          theme: input.theme,
        });

      if (!bookCollectionList?.length) {
        throw new NotFoundBookCollectionWithThemeError(input.theme);
      }

      for await (const iterator of bookCollectionList) {
        const authorIdList = iterator.books
          .map((book: Book) => book.authorId.value)
          .reduce((acc: string[], cur: string) => {
            if (acc.includes(cur)) {
              return acc;
            }
            acc.push(cur);
            return acc;
          }, [] as string[]);

        const authorDetail =
          await this._authorFacade.findListOfAuthorsByListOfIds({
            authorIdList,
          });

        if (!authorDetail?.authorList?.length) {
          throw new AuthorsNotFoundWithIdsError(authorIdList.join(","));
        }

        output.push({
          bookCollectionId: iterator.id.value,
          books: this.resolveBooks(iterator.books, authorDetail),
          libraryId: iterator.libraryId.value,
          theme: iterator.theme,
          totalAmountOfBooks: iterator.totalAmountOfBooks,
        });
      }

      return output;
    } catch (error) {
      throw error;
    }
  }

  private resolveBooks(
    books: Book[],
    authorDetail: FindListOfAuthorByListOfIdsFacadeOutputDto
  ): any[] {
    return books.map((book: Book) => {
      let author = authorDetail.authorList.find(
        (author) => author.authorId === book.authorId.value
      );

      if (!author) {
        throw new AuthorNotFoundByIdError(book.authorId.value);
      }

      return {
        author: {
          authorId: author.authorId,
          name: author.name,
        },
        bookId: book.id.value,
        name: book.name,
        totalPages: book.totalPages,
      };
    });
  }
}
