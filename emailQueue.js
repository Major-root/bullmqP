const { Queue } = require("bullmq");
const { connection } = require("../config/redis");

// Create a queue named "emailQueue"
const emailQueue = new Queue("emailQueue", { connection });

module.exports = emailQueue;
