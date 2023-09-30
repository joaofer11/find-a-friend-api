import { app } from './app';
import { env } from './env';

app.listen(
  {
    port: env.PORT,
  },
  () => console.info(`Server running on port:${env.PORT}`)
);
