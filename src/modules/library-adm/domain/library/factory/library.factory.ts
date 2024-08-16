import LibraryModel from "@/infrastructure/library/model/typeorm/library.model";
import Library from "../entity/library.entity";
import Address from "../value-object/address.value-object";
import LibraryId from "../value-object/library-id.value-object";

export default class LibraryFactory {
  static create(data: LibraryModel): Library {
    const library = new Library({
      id: new LibraryId(data.id),
      name: data.name,
    });
    const address = new Address({
      city: data.address.city,
      district: data.address.district,
      number: data.address.number,
      state: data.address.state,
      street: data.address.street,
      zipCode: data.address.zipCode,
    });
    library.changeAddress(address);

    return library;
  }

  static createList(data: LibraryModel[]): Library[] {
    return data.map((libraryModel) => this.create(libraryModel));
  }
}
