const Redis = require('ioredis');

const ServerConfig = require('../config/serverConfig.js');

const redisConfig = {
    port: ServerConfig.REDIS_PORT,
    host: ServerConfig.REDIS_HOST,
    maxRetriesPerRequest: null,
}

const redisConnection = new Redis(redisConfig);

module.exports = redisConnection;