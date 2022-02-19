// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './mydb.sqlite'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'better-sqlite3',
    connection: {
      filename: './mydb.sqlite'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'better-sqlite3',
    connection: {
      filename: './mydb.sqlite'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
