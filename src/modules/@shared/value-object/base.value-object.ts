import Notification from "@/modules/@shared/notification/notification";
import NotificationError from "@/modules/@shared/notification/notification.error";

export default class ValueObject {
  private _notification: Notification;

  constructor() {
    this._notification = new Notification();
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
