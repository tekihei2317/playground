import { users } from "../utils/user";
import { publicProcedure, router } from "./initialize";

export const appRouter = router({
  getUsers: publicProcedure.query(() => {
    return users;
  }),
});

export type AppRouter = typeof appRouter;
