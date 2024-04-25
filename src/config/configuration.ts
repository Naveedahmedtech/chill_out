import { AppConfig } from './app.config';
import { validate } from './app.config.validation';

export default () => {
  const config = new AppConfig(
    parseInt(process.env.PORT, 10) || 3000, // Default to 3000 if PORT is not set
    process.env.DATABASE_HOST || 'localhost', // Default to 'localhost' if DATABASE_HOST is not set
    parseInt(process.env.DATABASE_PORT, 10) || 5432, // Default to 5432 if DATABASE_PORT is not set
  );

  return validate(config);
};

