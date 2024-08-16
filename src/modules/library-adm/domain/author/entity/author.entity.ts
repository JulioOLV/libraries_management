import Entity from "@/modules/@shared/entity/base.entity";
import AuthorId from "@/modules/library-adm/domain/author/value-object/author-id.value-object";
import Name from "@/modules/library-adm/domain/author/value-object/name.value-object";

type AuthorProps = {
  id?: AuthorId;
  name: Name;
  age: number;
};

export default class Author extends Entity {
  private _name: Name;
  private _age: number;

  constructor(props: AuthorProps) {
    super(props.id);
    this._name = props.name;
    this._age = props.age;

    this.validation();
    this.throwErrorsPresentsInNotification();
  }

  public get name(): string {
    return this._name.fullName;
  }

  public get age(): number {
    return this._age;
  }

  private validation() {
    if (this._age < 16) {
      this.notification.addError({
        context: "author",
        message: "age of author must be greater than or equal to 16",
      });
    }
  }
}
