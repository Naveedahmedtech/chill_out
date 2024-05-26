import { AppConfig } from './app.config';
import { validate } from './app.config.validation';

export default () => {
  const config = new AppConfig(
    parseInt(process.env.PORT, 10) || 3000,
    process.env.DATABASE_URL,
    parseInt(process.env.DATABASE_PORT, 10) || 5432,
    process.env.API_KEY || 'your-default-api-key',
  );

  return validate(config);
};
