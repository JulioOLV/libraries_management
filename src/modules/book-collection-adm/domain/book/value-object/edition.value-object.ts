import ValueObject from "@/modules/@shared/value-object/base.value-object";

export default class Edition extends ValueObject {
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
        context: "edition",
        message: "the edition number value cannot be less than or equal to 0",
      });
    }
  }
}
