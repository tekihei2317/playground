import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./initialize";
import { appRouter } from "./router";

export const trpcExpressMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
});
