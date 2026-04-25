import { Worker, Job } from "bullmq";
import { redisConnection } from "../config/redis";
import { EmailJobData } from "../types/job.types";

const worker = new Worker<EmailJobData>(
  "emailQueue",
  async (job: Job<EmailJobData>) => {
    console.log(`📥 Processing Job ${job.id}:`, job.data);

  
    if (job.data.fail || Math.random() < 0.3) {
      console.log(`⚠️ Job ${job.id} is failing...`);
      throw new Error("Job failed intentionally");
    }

    // simulate async work (like sending email)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`📧 Email sent to: ${job.data.email}`);

    return { success: true };
  },
  {
    connection: redisConnection,
    concurrency: 5, 
  }
);