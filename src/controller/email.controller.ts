import { Request, Response } from "express";
import { emailQueue } from "../queue/email.queue";

export const sendEmail = async (req: Request, res: Response) => {
  const { email } = req.body as { email: string };

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  await emailQueue.add(
    "sendEmailJob",
    { email },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    }
  );

  res.json({
    message: "Email job added to queue",
  });
};