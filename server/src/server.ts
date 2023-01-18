import Fastify from "fastify";
import { prisma } from "./lib/prisma";
import cors from "@fastify/cors";

const app = Fastify();

app.register(cors);

app.get("/", async () => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'Beber'
      }
    }
  });
  return habits;
});


app.listen({ port: 3333 }).then(() => {
  console.log("HTTP Server running!");
});