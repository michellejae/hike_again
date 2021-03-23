// Update with your config settings.
const config = require(`../config/config`);
const path = require('path');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : config.database.user,
      password : config.database.password,
      database : config.database.database,
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, 'server/knex/migrations')
    
    },
    seeds: {
      directory: path.join(__dirname, 'server/knex/seeds')
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
  }

};
