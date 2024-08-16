export type NotificationErrorProps = {
  context: string;
  message: string;
};

export default class Notification {
  private _errors: NotificationErrorProps[] = [];

  public addError(error: NotificationErrorProps) {
    if (!error.context) {
      throw new Error("context is required");
    }

    if (!error.message) {
      throw new Error("message is required");
    }

    this._errors.push(error);
  }

  public message(context: string = ""): string {
    return this._errors
      .filter((error) => error.context === context)
      .map((error) => `${context}: ${error.message}`)
      .join(",");
  }

  public hasError(): boolean {
    return this._errors.length > 0;
  }

  public getErrors(): NotificationErrorProps[] {
    return this._errors;
  }
}
