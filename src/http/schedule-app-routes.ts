import { FastifyInstance } from 'fastify';
import { fastifyRegisterOrgController } from './request-handlers/fastify/fastify-register-org-controller';

export const scheduleAppRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', fastifyRegisterOrgController);
};
