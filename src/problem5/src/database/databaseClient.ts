import config from '@config/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const databaseClient = drizzle(config.databaseUrl);

export default databaseClient;
