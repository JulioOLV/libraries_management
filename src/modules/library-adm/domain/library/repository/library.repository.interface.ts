import Library from "../entity/library.entity";
import { FindAllLibrariesFilter } from "../typings/library.repository.typing";
import LibraryId from "../value-object/library-id.value-object";

export default interface LibraryRepositoryInterface {
  findLibraryById(libraryId: LibraryId): Promise<Library>;
  findAllLibraries(input: FindAllLibrariesFilter): Promise<Library[]>;
  createLibrary(input: Library): Promise<LibraryId>;
}
