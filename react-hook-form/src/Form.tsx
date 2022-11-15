import { z, ZodType } from "zod";
import {
  useForm,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps<
  Schema extends ZodType<FieldValues>,
  FormValues extends FieldValues = z.infer<Schema>
> = {
  schema: Schema;
  onSubmit: SubmitHandler<FormValues>;
  // childrenをコールバックにするのかしこすぎる
  children: (methods: UseFormReturn<FormValues>) => React.ReactNode;
};

export const Form = <Schema extends ZodType<FieldValues>>({
  schema,
  onSubmit,
  children,
}: FormProps<Schema>) => {
  type SchemaType = z.infer<typeof schema>;
  const methods = useForm<SchemaType>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  );
};
