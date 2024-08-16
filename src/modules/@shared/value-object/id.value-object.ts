import { v4 as uuid } from "uuid";

export default class Id {
  private _value: string;

  constructor(value?: string) {
    this._value = value ?? uuid();
  }

  public get value(): string {
    return this._value;
  }
}
