import { add } from "./add";

describe("add function", () => {
  it("1+1が2になること", () => {
    expect(add(1, 1)).toBe(2);
  });
});
