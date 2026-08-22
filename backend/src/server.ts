import { app } from './app';
import { env } from './config/env';

const startServer = () => {
  // Start listening on Port immediately
  app.listen(env.PORT, () => {
    console.log(`[Server] THENAM Skills API running in [${env.NODE_ENV}] mode on port: ${env.PORT}`);
    console.log(`[Server] Access control origin locked to client: ${env.CLIENT_URL}`);
  });
};

try {
  startServer();
} catch (error) {
  console.error('[Server] Critical server startup exception:', error);
  process.exit(1);
}
