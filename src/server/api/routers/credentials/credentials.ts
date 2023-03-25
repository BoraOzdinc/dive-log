import { z } from "zod";
import { nonEmptyString,UserId } from "~/utils/zod-utils";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const credentialsRouter = createTRPCRouter({
  RegisterNewUser: protectedProcedure
    .input(
      z.object({
        username: nonEmptyString,
        email: nonEmptyString,
        passwordHash: nonEmptyString,
      })
    )
    .mutation(({ ctx, input: { username , email , passwordHash } }) => {
      return ctx.prisma.user.create({
        data: {
          email,
          username,
          passwordHash,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getUserById: protectedProcedure
    .input(UserId)
    .query(({ ctx, input: id }) => {
      return ctx.prisma.user.findUnique({
        where: { id },
        include: {
          diverAcc:true
        },
      });
    }),

  
});
