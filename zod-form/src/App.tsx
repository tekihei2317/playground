import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const stringSchema = z.string().min(1);
const dateString = z
  .string()
  .regex(/^[0-9]{8}$/, { message: "日付は正しい形式で入力してください" });

const registrationFormSchema = z.object({
  userName: stringSchema.max(15),
  email: stringSchema.email(),
  birthDate: dateString,
});

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
  });
  const onSubmit = handleSubmit((d) => console.log(d));

  return (
    <div className="py-4">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 items-start max-w-xl mx-auto"
      >
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
          <p className="text-sm text-red-500">{errors.birthDate?.message}</p>
        </label>
        <button type="submit" className="bg-blue-200 px-4 py-2 rounded">
          登録
        </button>
      </form>
    </div>
  );
}

export default App;
