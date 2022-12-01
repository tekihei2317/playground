test.only("object assignment", () => {
  const data = { one: 1 };
  const newData = { ...data, two: 2 };

  expect(newData).toStrictEqual({ one: 1, two: 2 });
});

async function fetchData(
  { fail }: { fail: boolean } = { fail: false }
): Promise<string> {
  if (fail) {
    throw new Error("Error!");
  }
  return "Hello";
}

describe("testing asynchronous code", () => {
  describe("normal scenario", () => {
    test.only("using await", async () => {
      const data = await fetchData();
      expect(data).toBe("Hello");
    });

    test("using resolves", () => {
      expect(fetchData()).resolves.toBe("Hello");
    });
  });

  describe("exception scenario", () => {
    // Promiseがrejectされるとテストが失敗するため、catchする必要があります
    test("using await and toStrictEqual", async () => {
      await fetchData({ fail: true }).catch((error) => {
        expect(error).toStrictEqual(new Error("Error!"));
      });
    });

    // catchを使うと、エラーが発生しなかったときにアサーションが実行されずにテストが成功します
    test("using rejects", () => {
      expect(fetchData({ fail: true })).rejects.toStrictEqual(
        new Error("Error!")
      );
    });

    test("Promiseが成功するとテストも成功するため、アサーションの数をアサートする", async () => {
      expect.assertions(1);
      await fetchData({ fail: true }).catch((error) =>
        expect(error).toStrictEqual(new Error("Error!"))
      );
    });

    test("using rejects and toThrow", () => {
      // https://jestjs.io/ja/docs/expect#tothrowerror
      expect(fetchData({ fail: true })).rejects.toThrow(/^Error!$/);
      expect(fetchData({ fail: true })).rejects.toThrow(new Error("Error!"));
      expect(fetchData({ fail: true })).rejects.toThrow(Error);
    });
  });
});
