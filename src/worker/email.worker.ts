import { Worker, Job } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { EmailJobData } from "../types/job.types.js";

const worker = new Worker<EmailJobData>(
  "emailQueue",
  async (job: Job<EmailJobData>) => {
    console.log("Processing job:", job.data);

    // simulate failure
    if (Math.random() < 0.3) {
      throw new Error("Random failure");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Email sent to:", job.data.email);
  },
  { connection: redisConnection }
);