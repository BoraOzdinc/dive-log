import { z } from "zod";
import { nonEmptyString } from "~/utils/zod-utils";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const credentialsRouter = createTRPCRouter({
  RegisterNewUser: publicProcedure
    .input(
      z.object({
        username: nonEmptyString,
        email: nonEmptyString,
        password: nonEmptyString,
      })
    )
    .mutation(({ ctx, input: { username , email , password } }) => {
      return ctx.prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
