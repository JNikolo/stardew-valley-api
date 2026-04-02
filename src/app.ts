import Fastify from "fastify";

export default function createServer(): ReturnType<typeof Fastify> {
  const server = Fastify({
    logger: {
      level: process.env.FASTIFY_LOG_LEVEL || "info",
    },
  });

  server.get("/", function (request, reply) {
    reply.send({ hello: "world" });
  });
  return server;
}
