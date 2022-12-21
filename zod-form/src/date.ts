import { z } from "zod";

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

function toYmd(dateString: string): string {
  return `${dateString.substring(0, 4)}-${dateString.substring(
    4,
    6
  )}-${dateString.substring(6, 8)}`;
}

export const dateString = z
  .string()
  .regex(/^[0-9]{8}$/, { message: "日付を正しい形式で入力してください" })
  .refine((val) => isValidDate(new Date(toYmd(val))), {
    message: "有効な日付ではありません",
  })
  .transform((val) => new Date(toYmd(val)));
