import { createTRPCRouter } from "~/server/api/trpc";
import { googleRouter  } from "~/server/api/routers/google/google";
import { credentialsRouter } from "./routers/credentials/credentials";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  google: googleRouter,
  credentials: credentialsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
