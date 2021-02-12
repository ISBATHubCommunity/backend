function add(x, y) {
  return x + y;
}

describe("this will return x + y with multiple results", () => {
  it("should return 5", () => {
    expect(add(3, 2)).toBe(5);
  });
});
