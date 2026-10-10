import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

import { env } from "~/env";

const isWorkersRuntime =
  typeof navigator !== "undefined" &&
  navigator.userAgent === "Cloudflare-Workers";

const createPrismaClient = () =>
  new PrismaClient({
    // The Workers runtime cannot load Prisma's native engine, so it reaches Postgres through `pg`.
    adapter: isWorkersRuntime
      ? new PrismaPg(new Pool({ connectionString: env.DATABASE_URL, max: 1 }))
      : null,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

let nodeClient = globalForPrisma.prisma;

export function getDb() {
  // A Workers socket belongs to the request that opened it, so a client cannot be shared there.
  if (isWorkersRuntime) return createPrismaClient();

  nodeClient ??= createPrismaClient();
  if (env.NODE_ENV !== "production") globalForPrisma.prisma = nodeClient;
  return nodeClient;
}
