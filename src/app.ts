import fastify from 'fastify';
import { scheduleAppRoutes } from './http/schedule-app-routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(scheduleAppRoutes);

app.setErrorHandler((err, _, response) => {
  if (err instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error.', issues: err.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.log(err);
  }

  return response.status(500).send({ message: 'Internal server error.' });
});
