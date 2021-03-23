const environment = process.env.ENVIRONMENT || `development`; // if something else isn't setting ENV, use development
const config = require(`../knexfile`)[environment];  // // require environment's settings from knexfile
module.exports = require(`knex`)(config);  // connect to DB via knex using env's settings