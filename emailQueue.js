const { Queue } = require("bullmq");
const { connection } = require("./redis");

// Create a queue named "emailQueue"
const emailQueue = new Queue("emailQueue", { connection });

module.exports = emailQueue;
