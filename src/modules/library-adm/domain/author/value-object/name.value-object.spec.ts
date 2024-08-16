import Name from "./name.value-object";

describe("NameValueObject unit test", () => {
  it("should return an error when not providing a name and surname", () => {
    expect(() => {
      return new Name({ name: "", surname: "" });
    }).toThrow(
      "name: name is required,name: name length must be greater than or equal to 3,name: surname is required,name: surname length must be greater than or equal to 3"
    );
  });

  it("should return an error if the name is shorter than 3", () => {
    expect(() => {
      return new Name({ name: "J", surname: "Doe" });
    }).toThrow("name: name length must be greater than or equal to 3");
  });

  it("should return an error if the surname is shorter than 3", () => {
    expect(() => {
      return new Name({ name: "John", surname: "D" });
    }).toThrow("name: surname length must be greater than or equal to 3");
  });

  it("should return the fullname", () => {
    const name = new Name({ name: "John", surname: "Doe" });
    expect(name.fullName).toBe("John Doe");
  });
});
