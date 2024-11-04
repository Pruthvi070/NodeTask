const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: parseInt(process.env.RATE_LIMIT_POINTS, 10), // Max points (tasks) per duration
    duration: parseInt(process.env.RATE_LIMIT_DURATION, 10), // Duration in seconds
});

module.exports = rateLimiter;
