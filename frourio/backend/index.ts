import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify();

fastify.register(cors, {});

fastify.get("/", (req, reply) => {
  reply.send({ hello: "world" });
});

fastify.get("/hi", (req, reply) => {
  reply.send({ hello: "how are you?" });
});

fastify.listen({ port: 8888 });
