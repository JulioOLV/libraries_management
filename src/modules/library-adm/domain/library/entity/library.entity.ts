import Entity from "@/modules/@shared/entity/base.entity";
import LibraryId from "../value-object/library-id.value-object";
import Address from "../value-object/address.value-object";

export type LibraryProps = {
  id?: LibraryId;
  name: string;
};

export default class Library extends Entity {
  private _name: string;
  private _address!: Address;

  constructor(props: LibraryProps) {
    super(props.id);
    this._name = props.name;

    this.validate();
    this.throwErrorsPresentsInNotification();
  }

  public get name(): string {
    return this._name;
  }

  public get address(): Address {
    return this._address;
  }

  public changeAddress(address: Address): void {
    this._address = address;
  }

  private validate(): void {
    if (!this._name) {
      this.notification.addError({
        context: "library",
        message: "name is required",
      });
    }
  }
}
