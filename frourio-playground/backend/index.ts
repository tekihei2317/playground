import Fastify from "fastify";
import cors from "@fastify/cors";
import $server from "./$server";

const fastify = Fastify();

fastify.register(cors, {});
$server(fastify);

fastify.listen({ port: 8888 });
