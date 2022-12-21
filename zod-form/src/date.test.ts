import { dateString } from "./date";

describe("dateString", () => {
  test("有効な形式の場合、変換に成功すること", () => {
    const result = dateString.safeParse("20220101");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data instanceof Date).toBe(true);
    }
    console.log(result);
  });

  test("不正な形式の場合、変換に失敗すること", () => {
    const result = dateString.safeParse("invalid");

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "日付を正しい形式で入力してください"
      );
    }

    console.log(result);
  });

  test("無効な日付の場合、変換に失敗すること", () => {
    const result = dateString.safeParse("20220000");

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("有効な日付ではありません");
    }
    console.log(result);
  });
});
