import WebPush from "web-push";
import { FastifyInstance } from "fastify";
import { z } from "zod";


const publicKey = 'BMPg_UEQSLmgc3izUsEF5Tyxp5tNCSb81aMeX3YKLRzMxqCPTXUYYCqHCpQ_cTwLCQMJaRI5kbjj_KX1lPTfUn8';
const privateKey = '2igtzDgH5oLnmYoDGpZ19anS5hZbSmtJcsGIOqFAmD4';

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey
)

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return (
      publicKey
    );
  });

  app.post('/push/register', (request, reply) => {
    console.log(request.body);

    return reply.status(201).send();
  });

  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    });

    const {subscription} = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'Hello do Backend')
    }, 5000);

    return reply.status(201).send();
  });
}