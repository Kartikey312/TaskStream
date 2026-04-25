import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";
import { EmailJobData } from "../types/job.types";

export const emailQueue = new Queue<EmailJobData>("emailQueue", {
  connection: redisConnection,
});