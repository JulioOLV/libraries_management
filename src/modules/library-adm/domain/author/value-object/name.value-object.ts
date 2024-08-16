import ValueObject from "@/modules/@shared/value-object/base.value-object";

type NameProps = {
  name: string;
  surname: string;
};

export default class Name extends ValueObject {
  private _name: string;
  private _surname: string;

  constructor(props: NameProps) {
    super();
    this._name = props.name;
    this._surname = props.surname;

    this.validation();
    this.throwErrorsPresentsInNotification();
  }

  public get fullName(): string {
    return `${this._name} ${this._surname}`;
  }

  public get name(): string {
    return this._name;
  }

  public get surname(): string {
    return this._surname;
  }

  private validation() {
    if (!this._name) {
      this.notification.addError({
        context: "name",
        message: "name is required",
      });
    }

    if (this._name.length < 3) {
      this.notification.addError({
        context: "name",
        message: "name length must be greater than or equal to 3",
      });
    }

    if (!this._surname) {
      this.notification.addError({
        context: "name",
        message: "surname is required",
      });
    }

    if (this._surname.length < 3) {
      this.notification.addError({
        context: "name",
        message: "surname length must be greater than or equal to 3",
      });
    }
  }
}
