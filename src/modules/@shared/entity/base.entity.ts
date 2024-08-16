import Notification from "@/modules/@shared/notification/notification";
import NotificationError from "@/modules/@shared/notification/notification.error";
import Id from "@/modules/@shared/value-object/id.value-object";

export default class Entity {
  private _id: Id;
  private _deleted: boolean;
  private _notification: Notification;

  constructor(id?: Id, deleted?: boolean) {
    this._id = id ?? new Id();
    this._deleted = deleted ?? false;
    this._notification = new Notification();
  }

  public get id(): Id {
    return this._id;
  }

  public get deleted(): boolean {
    return this._deleted;
  }

  protected get notification(): Notification {
    return this._notification;
  }

  protected throwErrorsPresentsInNotification() {
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
