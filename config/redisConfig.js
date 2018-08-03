module.exports = (isPrimary) => {
  const redis = require('redis')
  const jsonify = require('redis-jsonify')
  const redisOptions = {
    host: isPrimary ? process.env.REDIS_PRIMARY_HOST : process.env.REDIS_REPLICA_HOST,
    port: process.env.REDIS_PORT
  }

  return jsonify(redis.createClient(redisOptions))
}
