import AuthorId from "../value-object/author-id.value-object";
import Author from "../entity/author.entity";

export default interface AuthorRepositoryInterface {
  findAuthorById(authorId: AuthorId): Promise<Author>;
  findAuthorListByIdList(authorIdList: AuthorId[]): Promise<Author[]>;
}
