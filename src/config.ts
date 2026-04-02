import "dotenv/config";

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  fastifyLogLevel: process.env.FASTIFY_LOG_LEVEL || "info",
};

export default config;
