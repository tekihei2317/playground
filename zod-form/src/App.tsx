import { z } from "zod";
import { Form } from "./Form";

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

function toYmd(dateString: string): string {
  return `${dateString.substring(0, 4)}-${dateString.substring(
    4,
    6
  )}-${dateString.substring(6, 8)}`;
}

const stringSchema = z.string().min(1);
const dateString = z
  .string()
  .regex(/^[0-9]{8}$/, { message: "日付を正しい形式で入力してください" })
  .refine((val) => isValidDate(new Date(toYmd(val))), {
    message: "有効な日付ではありません",
  })
  .transform((val) => new Date(toYmd(val)));

const registrationFormSchema = z.object({
  userName: stringSchema.max(15),
  email: stringSchema.email(),
  birthDate: dateString,
});

function App() {
  return (
    <div className="py-4">
      <Form<typeof registrationFormSchema>
        schema={registrationFormSchema}
        onSubmit={(d) => console.log(d)}
        className="flex flex-col gap-4 items-start max-w-xl mx-auto"
      >
        {({ register, formState: { errors } }) => (
          <>
            <label>
              ユーザー名
              <input {...register("userName")} className="border" />
              <p className="text-sm text-red-500">{errors.userName?.message}</p>
            </label>
            <label>
              メールアドレス
              <input {...register("email")} className="border" />
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            </label>
            <label>
              生年月日
              <input {...register("birthDate")} className="border" />
              <p className="text-sm text-red-500">
                {errors.birthDate?.message}
              </p>
            </label>
            <button type="submit" className="bg-blue-200 px-4 py-2 rounded">
              登録
            </button>
          </>
        )}
      </Form>
    </div>
  );
}

export default App;
