module.exports = function(isPrimary, callback) {
  const { Client } = require("pg");

  const databaseUser = process.env.DB_USER;
  const databasePassword = process.env.DB_PASSWORD;
  const databaseName = process.env.DB_NAME;
  const databaseHost = process.env.DB_HOST;
  const databasePort = process.env.DB_PORT;
  const databaseMaxCon = process.env.DB_MAX_CONNECTIONS;
  const databaseIdleTimeout = process.env.DB_IDLE_TIMEOUT;
  const databaseConnectionTimeout = process.env.DB_CONNECTION_TIMEOUT;

  let dbConfig = {
    user: databaseUser,
    password: databasePassword,
    database: databaseName,
    host: databaseHost,
    port: databasePort,
    max: databaseMaxCon,
    idleTimeoutMillis: databaseIdleTimeout,
    connectionTimeoutMillis: databaseConnectionTimeout
  };

  console.log("argument value: ", isPrimary);
  console.log("DB Configuration Values: ", dbConfig);
  const client = new Client(dbConfig);
  client
    .connect()
    .then(() => {
      console.log("PG Client connected");
      callback(null, client);
    })
    .catch(e => {
      console.error("PG Client connection error", e.stack);
      callback(e.stack, null);
    });

  // return new Client().connect();
};
