import Theme, * as ThemeValues from "./theme";

jest.mock("@mui/material/styles", () => ({
  createTheme: jest.fn().mockImplementation((theme) => theme),
}));

describe("[Theme]", () => {
  it("should not crash", () => {
    expect(Theme).toMatchObject(ThemeValues.baseTheme);
  });
});
