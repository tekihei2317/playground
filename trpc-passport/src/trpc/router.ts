import { publicProcedure, router } from "./initialize";

type User = {
  username: string;
  password: string;
};

const users: User[] = [
  {
    username: "root",
    password: "password",
  },
];

export const appRouter = router({
  getUsers: publicProcedure.query(() => {
    return users;
  }),
});

export type AppRouter = typeof appRouter;
