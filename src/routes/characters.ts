import { FastifyInstance } from "fastify";

async function villagersRoutes(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    reply.send({ message: "Return all charcters" });
  });

  server.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    reply.send({ message: `Return character with id ${id}` });
  });

  server.get("/:id/gifts", async (request, reply) => {
    const { id } = request.params as { id: string };
    reply.send({ message: `Return gifts for character with id ${id}` });
  });

  server.get("/:id/schedule", async (request, reply) => {
    const { id } = request.params as { id: string };
    reply.send({ message: `Return schedule for character with id ${id}` });
  });

  server.get("/:id/heart-events", async (request, reply) => {
    const { id } = request.params as { id: string };
    reply.send({ message: `Return heart events for character with id ${id}` });
  });

  server.get("/:id/relationships", async (request, reply) => {
    const { id } = request.params as { id: string };
    reply.send({ message: `Return relationships for character with id ${id}` });
  });

  server.get("/search", async (request, reply) => {
    const { name } = request.query as { name?: string };
    reply.send({ message: `Search characters with name ${name || "all"}` });
  });
}

export default villagersRoutes;
