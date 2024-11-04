const Bull = require('bull');
const task = require('./taskFunction');
const redisConfig = { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT };

// Initialize task queue
const taskQueue = new Bull('taskQueue', { redis: redisConfig });

taskQueue.process(async (job) => {
    const { userId } = job.data;
    await task(userId);
});

// Function to add task to queue with optional delay
exports.addToQueue = (userId, delay = 0) => {
    taskQueue.add({ userId }, { delay });
};
