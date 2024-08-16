import ValueObject from "@/modules/@shared/value-object/base.value-object";

export type AddressProps = {
  street: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  number: string;
};

export default class Address extends ValueObject {
  private _street: string;
  private _district: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;
  private _number: string;

  constructor(props: AddressProps) {
    super();
    this._street = props.street;
    this._district = props.district;
    this._city = props.city;
    this._state = props.state;
    this._zipCode = props.zipCode;
    this._number = props.number;

    this.validation();
    this.throwErrorsPresentsInNotification();
  }

  public get street(): string {
    return this._street;
  }

  public get district(): string {
    return this._district;
  }

  public get city(): string {
    return this._city;
  }

  public get state(): string {
    return this._state;
  }

  public get zipCode(): string {
    return this._zipCode;
  }

  public get number(): string {
    return this._number;
  }

  public toString(): string {
    return `${this._street}, ${this._number} - ${this._city} - ${this._state}, ${this._zipCode}`;
  }

  private validation(): void {
    if (!this._street) {
      this.notification.addError({
        context: "address",
        message: "street is required",
      });
    }

    if (!this._district) {
      this.notification.addError({
        context: "address",
        message: "district is required",
      });
    }

    if (!this._number) {
      this.notification.addError({
        context: "address",
        message: "number is required",
      });
    }

    if (!this._city) {
      this.notification.addError({
        context: "address",
        message: "city is required",
      });
    }

    if (!this._state) {
      this.notification.addError({
        context: "address",
        message: "state is required",
      });
    }

    if (this._state.length > 2) {
      this.notification.addError({
        context: "address",
        message: "state must be not bigger than 2",
      });
    }

    if (!this._zipCode) {
      this.notification.addError({
        context: "address",
        message: "zipCode is required",
      });
    }

    if (this._zipCode.length > 9) {
      this.notification.addError({
        context: "address",
        message: "zipCode must not bigger than 9",
      });
    }
  }
}
