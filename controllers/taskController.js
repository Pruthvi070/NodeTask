const taskQueue = require('../queues/taskQueue');
const rateLimiter = require('../utils/rateLimiter');

exports.handleTaskRequest = async (req, res) => {
    const { user_id: userId } = req.body;

    try {
        // Apply rate limit per user
        await rateLimiter.consume(userId);  // Consume a point for the user

        // If rate limit is not exceeded, add the task to the queue
        taskQueue.addToQueue(userId);
        return res.status(200).json({ message: 'Task added to queue.' });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Queue task with delay if rate limit exceeded
        taskQueue.addToQueue(userId, parseInt(process.env.TASK_DELAY_MS, 10));
        return res.status(429).json({ message: 'Rate limit exceeded. Task queued with delay.' });
    }
};
