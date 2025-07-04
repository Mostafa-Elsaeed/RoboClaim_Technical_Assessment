import { appConfig } from './files/app.env.config';
import { databaseConfig } from './files/db.env.config';
import { jwtConfig } from './files/jwt.env.config';
import { rabbitmqConfig } from './files/rabbitmq.env.config';

export default () => ({
  ...appConfig,
  ...databaseConfig(),
  ...jwtConfig(),
  ...rabbitmqConfig,
});
