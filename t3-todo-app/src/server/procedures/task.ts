import { z } from "zod";
import { publicProcedure } from "../trpc/trpc";

export const getTaskSchema = z.object({
  id: z.string(),
});

// これだとテストしにくくそう
// use-cases/に分けるやり方のほうが、純粋な関数なのでテストしやすい
export const getTaskProcedure = publicProcedure
  .input(getTaskSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.prisma.task.findUnique({
      where: {
        id: input.id,
      },
    });
  });
