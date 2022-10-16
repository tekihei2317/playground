import { ZodType } from "zod";

type Try<A, B, C> = A extends B ? A : C;

type NarrowRaw<T> =
  | (T extends Function ? T : never)
  | (T extends string | number | bigint | boolean ? T : never)
  | (T extends [] ? [] : never)
  | {
      [K in keyof T]: K extends "description" ? T[K] : NarrowNotZod<T[K]>;
    };

type NarrowNotZod<T> = Try<T, ZodType, NarrowRaw<T>>;

export type Narrow<T> = Try<T, [], NarrowNotZod<T>>;
