import objectToStyle from "../src/object-to-style";

describe("objectToStyle", () => {
  test("converts an object to a valid CSS style string", () => {
    const style = {
      backgroundColor: "red",
      fontSize: 16,
      marginTop: "10px",
      padding: 20,
    };
    expect(objectToStyle(style)).toBe(
      "background-color: red; font-size: 16px; margin-top: 10px; padding: 20px"
    );
  });

  test("handles an empty object", () => {
    expect(objectToStyle({})).toBe("");
  });

  test("handles a single property", () => {
    expect(objectToStyle({ width: 100 })).toBe("width: 100px");
  });

  test("converts camelCase keys to kebab-case", () => {
    const style = { borderRadius: 5, zIndex: 10 };
    expect(objectToStyle(style)).toBe("border-radius: 5px; z-index: 10px");
  });

  test("preserves string values without appending px", () => {
    const style = { display: "flex", color: "blue" };
    expect(objectToStyle(style)).toBe("display: flex; color: blue");
  });
});
