import Fastify from "fastify";

const server = Fastify({
  logger: true, // Enable logging for debugging and monitoring
});

server.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
