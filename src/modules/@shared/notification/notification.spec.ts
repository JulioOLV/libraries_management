import Notification from "./notification";

describe("Notification unit tests", () => {
  it("should return all errors in notification", () => {
    const notification = new Notification();

    const error1 = {
      context: "customer",
      message: "one message for error",
    };
    notification.addError(error1);

    const error2 = {
      context: "catalog",
      message: "secound message for error",
    };
    notification.addError(error2);

    const expected = [error1, error2];

    expect(notification.getErrors()).toHaveLength(2);
    expect(notification.getErrors()).toEqual(expected);
  });

  it("should create errors for notification", () => {
    const notification = new Notification();

    const error1 = {
      context: "customer",
      message: "one message for error",
    };
    notification.addError(error1);
    const gg = notification.message("customer");
    expect(notification.message("customer")).toBe(
      "customer: one message for error"
    );

    const error2 = {
      context: "catalog",
      message: "secound message for error",
    };
    notification.addError(error2);
    expect(notification.message("catalog")).toBe(
      "catalog: secound message for error"
    );

    const error3 = {
      context: "customer",
      message: "thirty message for error",
    };
    notification.addError(error3);
    expect(notification.message("customer")).toBe(
      "customer: one message for error,customer: thirty message for error"
    );
  });

  it("should check if notification has a least one error", () => {
    const notification = new Notification();

    const error1 = {
      context: "customer",
      message: "one message for error",
    };
    notification.addError(error1);

    expect(notification.hasError()).toBeTruthy();
  });

  it("should return throw when context is not provided by add error", () => {
    expect(() => {
      const notification = new Notification();

      const error = {
        context: "",
        message: "one message error",
      };
      notification.addError(error);
    }).toThrow("context is required");
  });

  it("should return throw when message is not provided by add error", () => {
    expect(() => {
      const notification = new Notification();

      const error = {
        context: "customer",
        message: "",
      };
      notification.addError(error);
    }).toThrow("message is required");
  });
});
