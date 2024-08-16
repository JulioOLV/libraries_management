import Entity from "@/modules/@shared/entity/base.entity";
import AuthorId from "../value-object/author-id.value-object";
import BookId from "../value-object/book-id.value-object";
import Edition from "../value-object/edition.value-object";
import ReleaseYear from "../value-object/release-year.value-object";

export type BookProps = {
  id?: BookId;
  name: string;
  releaseYear: ReleaseYear;
  edition: Edition;
  authorId: AuthorId;
  totalPages: number;
};

export default class Book extends Entity {
  private _name: string;
  private _releaseYear: ReleaseYear;
  private _edition: Edition;
  private _authorId: AuthorId;
  private _totalPages: number;
  private _availability: boolean = true;

  constructor(props: BookProps) {
    super(props.id);
    this._name = props.name;
    this._releaseYear = props.releaseYear;
    this._edition = props.edition;
    this._authorId = props.authorId;
    this._totalPages = props.totalPages;

    this.validation();
    this.throwErrorsPresentsInNotification();
  }

  public get name(): string {
    return this._name;
  }

  public get releaseYear(): ReleaseYear {
    return this._releaseYear;
  }

  public get edition(): Edition {
    return this._edition;
  }

  public get authorId(): AuthorId {
    return this._authorId;
  }

  public get totalPages(): number {
    return this._totalPages;
  }

  public get availability(): boolean {
    return this._availability;
  }

  public changeEdition(edition: Edition) {
    this._edition = edition;
  }

  public changeTotalPages(totalPages: number) {
    this._totalPages = totalPages;
    this.validation();
    this.throwErrorsPresentsInNotification();
  }

  public takeOutALoan() {
    if (this._availability) {
      this._availability = false;
    } else {
      this.notification.addError({
        context: "book",
        message: "it is not possible to borrow a book that is not available",
      });
      this.throwErrorsPresentsInNotification();
    }
  }

  private validation() {
    if (this._totalPages <= 5) {
      this.notification.addError({
        context: "book",
        message: "the total number of pages must be greater than 5",
      });
    }

    if (!this._name) {
      this.notification.addError({
        context: "book",
        message: "name is required",
      });
    }

    if (this._name.length < 5) {
      this.notification.addError({
        context: "book",
        message: "name length must be greater than or equal to 5",
      });
    }
  }
}
