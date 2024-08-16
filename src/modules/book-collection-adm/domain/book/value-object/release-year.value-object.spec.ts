import ReleaseYear from "./release-year.value-object";

describe("ReleaseYearValueObject unit tests", () => {
  it("should return an error when the release year is invalid", () => {
    expect(() => {
      return new ReleaseYear(-100);
    }).toThrow("releaseYear: release year value contains invalid data");
  });
});
