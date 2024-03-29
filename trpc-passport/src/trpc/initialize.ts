import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import superjson from "superjson";

export function createContext({
  req,
}: trpcExpress.CreateExpressContextOptions) {
  console.log(req.user);

  return { user: req.user };
}

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
