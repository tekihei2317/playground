import { z, ZodType } from "zod";
import {
  useForm,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps<TSchema extends ZodType<FieldValues>> = {
  schema: TSchema;
  onSubmit: SubmitHandler<z.output<TSchema>>;
  children: (methods: UseFormReturn<z.input<TSchema>>) => React.ReactNode;
  options?: UseFormProps<z.input<TSchema>>;
} & Omit<React.ComponentProps<"form">, "onSubmit" | "children">;

export const Form = <TSchema extends ZodType<FieldValues>>({
  schema,
  onSubmit,
  children,
  options,
  ...props
}: FormProps<TSchema>) => {
  const methods = useForm<z.input<TSchema>>({
    resolver: zodResolver(schema),
    ...options,
  });
  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children(methods)}
    </form>
  );
};
