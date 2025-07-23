const express = require("express");
const emailQueue = require("./emailQueue");
require("./emailWorker"); // Ensure the worker is started

const app = express();

app.use(express());

app.post("/send-email", async (req, res) => {
  const { email, body } = req.body;

  if (!email || !body) {
    return res.status(400).json({ error: "Email and body are required." });
  }

  try {
    // Add a job to the email queue
    const job = await emailQueue.add("sendEmail", {
      type: "otp",
      user: {
        email: "lockedi771@gmail.com",
        firstName: "Major",
      },
      data: {
        otp: "MBI-2025",
      },
    });
    res
      .status(200)
      .json({ message: "✅ Email job added to the queue.", jobId: job.id });
  } catch (error) {
    console.error("Error adding job to the queue:", error);
    res.status(500).json({ error: "❌ Failed to add job to the queue." });
  }
});

module.exports = app;
