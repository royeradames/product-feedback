/*  define how to handle knex in dev, testing, and production */
// update with your config settings
const pgConnection = process.env.DATABASE_URL;

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/product-feedback.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
    pool: {
      afterCreate: (conn: any, done: any) => {
        conn.run(`PRAGMA foreign_key = ON`, done);
      },
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
    pool: {
      afterCreate: (conn: any, done: any) => {
        conn.run(`PRAGMA foreign_key = ON`, done);
      },
    },
  },
  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/db/migrations',
      loadExtensions: ['.js'],
    },
    seeds: {
      directory: './src/db/seeds',
      loadExtensions: ['.js'],
    },
  },
};
