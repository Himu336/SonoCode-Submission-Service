const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    REDIS_PORT: process.env.REDIS_PORT || "6379",
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    // Prefer a single URL for managed Redis providers like Upstash (rediss://...)
    UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
    // Generic alias commonly used by providers; if set, we will use it
    REDIS_URL: process.env.REDIS_URL,
    // Upstash REST is not compatible with BullMQ/ioredis; included for completeness
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    ATLAS_DB_URL: process.env.ATLAS_DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    PROBLEM_ADMIN_SERVICE_URL: process.env.PROBLEM_ADMIN_SERVICE_URL
}