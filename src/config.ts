import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() !== "") return Number(val);
    return undefined;
  }, z.number().default(3000)),
  FASTIFY_LOG_LEVEL: z.string().default("info"),
});

const parsed = envSchema.parse(process.env as Record<string, string>);

const config = {
  port: parsed.PORT,
  fastifyLogLevel: parsed.FASTIFY_LOG_LEVEL,
} as const;

export default config;
