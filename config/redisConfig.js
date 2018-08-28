module.exports = function(callback) {
  const redis = require("redis");
  const jsonify = require("redis-jsonify");
  // const redisOptions = {
  //   host: isPrimary
  //     ? process.env.REDIS_PRIMARY_HOST
  //     : process.env.REDIS_REPLICA_HOST,
  //   port: process.env.REDIS_PORT
  // };

  const redisOptions = {
    host: "127.0.0.1",
    port: 6379
  };
  const redisObject = redis.createClient(redisOptions);

  redisObject.on("connect", function() {
    console.log("Redis Connection successfully created");
    callback(null, redisObject);
  });

  redisObject.on("error", function(err) {
    console.error("Error in Redis connection: " + err);
    callback(err, null);
  });
};
