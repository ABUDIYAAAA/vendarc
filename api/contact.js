import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Simple in-memory rate limiter
 * NOTE: resets on cold start (fine for free tiers)
 */
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;
const ipStore = new Map();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  const now = Date.now();
  const record = ipStore.get(ip);

  if (record) {
    const { count, startTime } = record;

    if (now - startTime < RATE_LIMIT_WINDOW) {
      if (count >= MAX_REQUESTS) {
        return res.status(429).json({
          error: "Too many requests. Please try again later.",
        });
      }

      record.count += 1;
    } else {
      ipStore.set(ip, { count: 1, startTime: now });
    }
  } else {
    ipStore.set(ip, { count: 1, startTime: now });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    await resend.emails.send({
      from: "Nimit from Vendarc <nimit@vendarc.com>",
      to: email,
      subject: "Welcome to Vendarc",
      text: `
Welcome to Vendarc.

Nimit here.

Thanks for reaching out to us — we're really glad you did.

Tell us a bit about what you're looking to build, the problems you’re trying to solve, or any ideas you have in mind. Whether it’s a website, product, or system, we’d love to understand your requirements.

We try our best to reply within 24 working hours.

Looking forward to hearing from you.

— Vendarc
      `.trim(),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return res.status(500).json({
      error: "Something went wrong while sending the email",
    });
  }
}
