import Author from "@/modules/library-adm/domain/author/entity/author.entity";
import AuthorListNotFoundError from "@/modules/library-adm/domain/author/error/author-list-not-found.error";
import AuthorNotFoundError from "@/modules/library-adm/domain/author/error/author-not-found.error";
import AuthorRepositoryInterface from "@/modules/library-adm/domain/author/repository/author.repository.interface";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import Name from "@/modules/library-adm/domain/author/value-object/name.value-object";
import { In } from "typeorm";
import AuthorModel from "./author.model";

export default class AuthorRepository implements AuthorRepositoryInterface {
  async createAuthor(author: Author): Promise<AuthorId> {
    try {
      await AuthorModel.save({
        id: author.id.value,
        age: author.age,
        name: author.firstName,
        surname: author.lastName,
      });

      return author.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAuthorListByIdList(authorIdList: AuthorId[]): Promise<Author[]> {
    try {
      const authorList = await AuthorModel.find({
        where: {
          id: In(authorIdList.map((authorId) => authorId.value)),
        },
      });

      if (!authorList.length) {
        throw new AuthorListNotFoundError(authorIdList);
      }

      return authorList.map(
        (author: AuthorModel) =>
          new Author({
            id: new AuthorId(author.id),
            age: author.age,
            name: new Name({
              name: author.name,
              surname: author.surname,
            }),
          })
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAuthorById(authorId: AuthorId): Promise<Author> {
    try {
      const authorInDb = await AuthorModel.findOne({
        where: {
          id: authorId.value,
        },
      });

      if (!authorInDb) {
        throw new AuthorNotFoundError(authorId);
      }

      return new Author({
        id: new AuthorId(authorInDb.id),
        age: authorInDb.age,
        name: new Name({
          name: authorInDb.name,
          surname: authorInDb.surname,
        }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
