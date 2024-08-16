import { v4 as uuid } from "uuid";
import LibraryModel from "@/infrastructure/library/model/typeorm/library.model";
import Library from "@/modules/library-adm/domain/library/entity/library.entity";
import LibraryNotFoundError from "@/modules/library-adm/domain/library/error/library-not-found.error";
import LibraryFactory from "@/modules/library-adm/domain/library/factory/library.factory";
import LibraryRepositoryInterface from "@/modules/library-adm/domain/library/repository/library.repository.interface";
import { FindAllLibrariesFilter } from "@/modules/library-adm/domain/library/typings/library.repository.typing";
import LibraryId from "@/modules/library-adm/domain/library/value-object/library-id.value-object";

export default class LibraryRepository implements LibraryRepositoryInterface {
  async findLibraryById(libraryId: LibraryId): Promise<Library> {
    try {
      const libraryInDb = await LibraryModel.findOne({
        where: { id: libraryId.value },
        relations: ["address"],
      });

      if (!libraryInDb) {
        throw new LibraryNotFoundError(libraryId.value);
      }

      const library = LibraryFactory.create(libraryInDb);

      return library;
    } catch (error) {
      throw error;
    }
  }

  async findAllLibraries(input: FindAllLibrariesFilter): Promise<Library[]> {
    try {
      const librariesInDb = await LibraryModel.find({
        relations: ["address"],
        take: input.limit,
        skip: input.page - 1,
        order: { name: input.sort },
      });

      const libraries = LibraryFactory.createList(librariesInDb);

      return libraries;
    } catch (error) {
      throw error;
    }
  }

  async createLibrary(input: Library): Promise<LibraryId> {
    try {
      await LibraryModel.save({
        id: input.id.value,
        name: input.name,
        address: {
          id: uuid(),
          city: input.address.city,
          district: input.address.district,
          number: input.address.number,
          state: input.address.state,
          street: input.address.street,
          zipCode: input.address.zipCode,
        },
      });

      return input.id;
    } catch (error) {
      throw error;
    }
  }
}
