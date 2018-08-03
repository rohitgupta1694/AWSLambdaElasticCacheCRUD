module.exports = isPrimary => {
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

  const client = new Client();
  client
    .connect()
    .then(() => {
      console.log("connected");
      return this.client;
    })
    .catch(err => {
      console.error("connection error", err.stack);
      return err;
    });
};
