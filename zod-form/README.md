# zod-form

zodとreact-hook-formの組み合わせを考えます。

## Render propを使った実装

bulletproof-reactを参考にしました。

[bulletproof-react/Form.tsx at master · alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/Form.tsx)

react-hook-formの`useForm`を直接使うのは気になるので、コンポーネントから使うようにします。

コンポーネント定義側にある値に使用側からアクセスするために、propsでコンポーネントを返す関数（`(props: Props) => React.ReactNode`）を渡してあげます。これはRender propパターンといいます。

```tsx
const FormUsingRenderProp = () => {
  return (
    <Form
      schema={registrationFormSchema}
      onSubmit={(d) => console.log(d)}
      className="flex flex-col gap-4 items-start max-w-xl mx-auto"
      options={{
        defaultValues: {
          birthDate: "20000101",
        },
      }}
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
            <p className="text-sm text-red-500">{errors.birthDate?.message}</p>
          </label>
          <button type="submit" className="bg-blue-200 px-4 py-2 rounded">
            登録
          </button>
        </>
      )}
    </Form>
  );
};
```

## カスタムフックを使った実装

カスタムフックを使っても同様に実装できます。`useZodForm`というカスタムフックを作りました。これは`useForm`をラップしたもので、第一引数にzodのスキーマをとり、`useForm`の戻り値と`Form`コンポーネントを返します。


```tsx
const FormUsingCustomHook = () => {
  const {
    Form,
    register,
    formState: { errors },
  } = useZodForm(registrationFormSchema, {
    defaultValues: {
      birthDate: "20000101",
    },
  });

  return (
    <Form
      onSubmit={(d) => console.log(d)}
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
    </Form>
  );
};
```
