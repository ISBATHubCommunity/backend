function add(x, y) {
  return x + y;
}

test("should return 3", () => {
  expect(add(1, 2)).toBe(3);
});
