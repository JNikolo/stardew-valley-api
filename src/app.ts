import Fastify from "fastify";
import villagersRoutes from "./routes/characters";

export default function createServer(): ReturnType<typeof Fastify> {
  const server = Fastify({
    logger: {
      level: process.env.FASTIFY_LOG_LEVEL || "info",
    },
  });

  server.register(villagersRoutes, { prefix: "/villagers" });

  server.get("/", function (request, reply) {
    reply.send({ hello: "world" });
  });
  return server;
}
