const Redis = require('ioredis');

const ServerConfig = require('../config/serverConfig.js');

// Prefer a single URL (e.g., Upstash rediss:// URL) when available; otherwise fallback to host/port
const urlFromEnv = ServerConfig.REDIS_URL || ServerConfig.UPSTASH_REDIS_URL;

const redisConnection = urlFromEnv
    ? new Redis(urlFromEnv, { maxRetriesPerRequest: null })
    : new Redis({
        port: ServerConfig.REDIS_PORT,
        host: ServerConfig.REDIS_HOST,
        maxRetriesPerRequest: null,
    });

module.exports = redisConnection;