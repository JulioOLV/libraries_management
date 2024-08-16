import Edition from "./edition.value-object";

describe("EditionValueObject unit tests", () => {
  it("should return error when edition number is less or equal than 0", () => {
    expect(() => {
      return new Edition(0);
    }).toThrow(
      "edition: the edition number value cannot be less than or equal to 0"
    );
  });
});
