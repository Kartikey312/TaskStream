import { Request, Response } from "express";
import { emailQueue } from "../queue/email.queue";

export const sendEmail = async (req: Request, res: Response) => {
  const { email, fail } = req.body as { email: string; fail?: boolean };

  // validation
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  await emailQueue.add(
    "sendEmailJob",
    {
      email,
      fail: fail ?? false, // default false if not provided
    },
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
    data: {
      email,
      fail: fail ?? false,
    },
  });
};