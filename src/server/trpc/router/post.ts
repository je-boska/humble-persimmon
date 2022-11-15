import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  createPost: publicProcedure
    .input(z.object({ title: z.string().nullish() }))
    .mutation(({ input, ctx }) => {
      return prisma?.post.create({
        data: {
          title: input.title,
          author: { connect: { id: ctx.session?.user?.id } },
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
