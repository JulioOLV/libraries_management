import ValueObject from "@/modules/@shared/value-object/base.value-object";

export default class ReleaseYear extends ValueObject {
  private _value: number;

  constructor(value: number) {
    super();
    this._value = value;

    this.validate();

    this.throwErrorsPresentsInNotification();
  }

  public get value(): number {
    return this._value;
  }

  private validate() {
    if (this._value <= 0) {
      this.notification.addError({
        context: "releaseYear",
        message: "release year value contains invalid data",
      });
    }
  }
}
