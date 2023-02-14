import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";
import { notificationRoutes } from "./notifications-routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);
app.register(notificationRoutes);

app.listen({host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('Server is running')
});