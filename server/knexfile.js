const path = require('path');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, 'knex/migrations')
    
    },
    seeds: {
      directory: path.join(__dirname, 'knex/seeds')
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, 'knex/migrations')
    
    },
    seeds: {
      directory: path.join(__dirname, 'knex/seeds')
    }
  },

};
