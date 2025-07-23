const { Worker } = require("bullmq");
const { connection } = require("./redis");
const Email = require("./email");

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    try {
      const { type, user, data } = job.data;
      const email = new Email(user, data);

      console.log(`📨 Processing "${type}" email for ${user.email}`);

      // Dynamically call method
      if (type === "otp") await email.sendOTPEmail();
      else if (type === "account") await email.sendAccountEmail();
      else if (type === "voucher") await email.giftVoucherEmail();
      else throw new Error(`Unknown email type: ${type}`);

      console.log(`✅ Email of type "${type}" sent to ${user.email}`);
    } catch (err) {
      console.error(`❌ Email job failed:`, err);
      throw err;
    }
  },
  { connection }
);
