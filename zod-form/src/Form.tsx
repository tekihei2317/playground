import { z, ZodType } from "zod";
import {
  useForm,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

// render prop

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

// custom hook

type ZodFormProps<TSchema extends ZodType<FieldValues>> = {
  onSubmit: SubmitHandler<z.output<TSchema>>;
  children: React.ReactNode;
} & Omit<React.ComponentProps<"form">, "onSubmit" | "children">;

type UseZodFormReturn<TSchema extends ZodType<FieldValues>> = UseFormReturn<
  z.input<TSchema>
> & {
  Form: (props: ZodFormProps<TSchema>) => JSX.Element;
};

export function useZodForm<TSchema extends ZodType<FieldValues>>(
  schema: TSchema,
  options: UseFormProps<z.input<TSchema>> = {}
): UseZodFormReturn<TSchema> {
  const methods = useForm<z.input<TSchema>>({
    resolver: zodResolver(schema),
    ...options,
  });

  const Form = useCallback(
    ({ onSubmit, children, ...props }: ZodFormProps<TSchema>) => {
      const handleSubmit = methods.handleSubmit(onSubmit);

      return (
        <form onSubmit={handleSubmit} {...props}>
          {children}
        </form>
      );
    },
    [methods]
  );

  return { ...methods, Form };
}
