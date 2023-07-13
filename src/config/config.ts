export const server = {
  port: process.env.SERVER_PORT || 3000,
};

export const database = {
  server: process.env.DATABASE_SERVER || '127.0.0.1',
  port: process.env.DATABASE_PORT || 3306,
  dbname: process.env.DATABASE_DBNAME || 'wet_bat',
  user: process.env.DATABASE_USER || '',
  password: process.env.DATABASE_PASSWORD || '',
};
