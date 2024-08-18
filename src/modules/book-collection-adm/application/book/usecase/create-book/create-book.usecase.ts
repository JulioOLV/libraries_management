import CreateBookUsecaseInterface, {
  CreateBookUsecaseInputDto,
  CreateBookUsecaseOutputDto,
} from "./create-book.dto";
import { BookRepositoryInterface } from "@/modules/book-collection-adm/domain/book/repository/book.repository.interface";
import BookFactory from "@/modules/book-collection-adm/domain/book/factory/book.factory";
import Book from "@/modules/book-collection-adm/domain/book/entity/book.entity";

export default class CreateBookUsecase implements CreateBookUsecaseInterface {
  private _repository: BookRepositoryInterface;

  constructor(repository: BookRepositoryInterface) {
    this._repository = repository;
  }

  async execute(
    input: CreateBookUsecaseInputDto
  ): Promise<CreateBookUsecaseOutputDto> {
    const book = BookFactory.create(input);

    await this._repository.registerBook(book);

    return this.mapToOutputObject(book);
  }

  private mapToOutputObject(book: Book): CreateBookUsecaseOutputDto {
    return {
      bookId: book.id.value,
      availability: book.availability,
    };
  }
}
