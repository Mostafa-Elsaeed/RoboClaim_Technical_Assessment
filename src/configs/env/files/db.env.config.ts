export const databaseConfig = () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    databaseConnection: process.env.DATABASE_CONNECTION,
    databaseSchema: process.env.DATABASE_SCHEMA,
  },
});
