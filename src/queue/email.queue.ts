import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { EmailJobData } from "../types/job.types.js";

export const emailQueue = new Queue<EmailJobData>("emailQueue", {
  connection: redisConnection,
});