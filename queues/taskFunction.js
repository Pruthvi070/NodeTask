const fs = require('fs');
const path = require('path');
const util = require('util');

const logFilePath = path.join(__dirname, '../logs/task_logs.txt');

// Promisify fs.appendFile to use async/await
const appendFile = util.promisify(fs.appendFile);

module.exports = async function task(userId) {
    const timestamp = Date.now();
    const logEntry = `${userId}-task completed at-${timestamp}\n`;

    try {
        // Check if logs directory exists, create if not
        const dir = path.dirname(logFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        await appendFile(logFilePath, logEntry);
        console.log(`${userId}-task completed at-${timestamp}`);
    } catch (err) {
        console.error('Error logging task:', err);
        throw err; 
    }
};
