import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email configuration
const getEmailTransporter = () => {
  const email = process.env.GMAIL_EMAIL;
  const password = process.env.GMAIL_APP_PASSWORD;

  if (!email || !password) {
    throw new Error("Email credentials not configured");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });
};

// Generate HTML email with table format
const generateEmailHTML = (
  type: "quote" | "contact" | "newsletter",
  data: Record<string, string>
): string => {
  const timestamp = new Date().toLocaleString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let title = "";
  let subtitle = "";
  let fields: { label: string; value: string }[] = [];

  if (type === "quote" || type === "contact") {
    title = type === "quote" ? "New Quote Request" : "New Contact Form Submission";
    subtitle = type === "quote"
      ? "A customer has requested a free quote for boiler services."
      : "A customer has submitted an inquiry through the contact form.";

    fields = [
      { label: "Full Name", value: data.name || "-" },
      { label: "Email Address", value: data.email || "-" },
      { label: "Phone Number", value: data.phone || "-" },
      { label: "Service Required", value: data.issue || data.service || "-" },
      { label: "Message", value: data.message || "-" },
    ];
  } else if (type === "newsletter") {
    title = "New Newsletter Subscription";
    subtitle = "A new customer has subscribed to the newsletter.";
    fields = [
      { label: "Email Address", value: data.email || "-" },
      { label: "Subscription Date", value: timestamp },
    ];
  }

  const tableRows = fields
    .map(
      (field) => `
    <tr>
      <td style="padding: 12px 16px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: 600; color: #0b2a5b; width: 30%;">
        ${field.label}
      </td>
      <td style="padding: 12px 16px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #334155;">
        ${field.value}
      </td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0b2a5b 0%, #1e3a8a 100%); padding: 32px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${title}</h1>
          <p style="margin: 12px 0 0; color: #e0e7ff; font-size: 16px;">${subtitle}</p>
        </div>

        <!-- Content -->
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
            ${tableRows}
          </table>

          <div style="margin-top: 24px; padding: 16px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
            <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
              📅 Submitted on: ${timestamp}
            </p>
          </div>

          <div style="margin-top: 32px; text-align: center; color: #64748b; font-size: 14px;">
            <p style="margin: 0;">This email was sent from the UKB Boiler Installation website.</p>
            <p style="margin: 8px 0 0;">Please respond to the customer promptly.</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #0b2a5b; padding: 24px; text-align: center;">
          <p style="margin: 0; color: #e0e7ff; font-size: 14px;">UKB Boiler Installation</p>
          <p style="margin: 8px 0 0; color: #94a3b8; font-size: 12px;">© ${new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: silently succeed if bot fills hidden field
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const type = body.type as "quote" | "contact" | "newsletter";
    if (!type || !["quote", "contact", "newsletter"].includes(type)) {
      return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    // Validate required fields based on type
    if (type === "quote" || type === "contact") {
      const name = String(body.name ?? "").trim();
      const email = String(body.email ?? "").trim();
      const phone = String(body.phone ?? "").trim();
      const issue = String(body.issue ?? "").trim();

      if (!name || !phone || !issue || !/^\S+@\S+\.\S+$/.test(email)) {
        return NextResponse.json(
          { error: "Please fill in all required fields." },
          { status: 400 }
        );
      }
    } else if (type === "newsletter") {
      const email = String(body.email ?? "").trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return NextResponse.json(
          { error: "Please provide a valid email address." },
          { status: 400 }
        );
      }
    }

    // Get email configuration
    const toEmail = process.env.RECIPIENT_EMAIL || process.env.GMAIL_EMAIL;
    if (!toEmail) {
      console.error("RECIPIENT_EMAIL or GMAIL_EMAIL is missing in .env");
      return NextResponse.json(
        { error: "Email is not configured." },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = getEmailTransporter();

    // Generate email HTML
    const html = generateEmailHTML(type, body);

    // Send email
    const subject =
      type === "quote"
        ? `New Quote Request: ${body.issue} (${body.name})`
        : type === "contact"
        ? `New Contact Form: ${body.name}`
        : "New Newsletter Subscription";

    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: toEmail,
      subject,
      html,
      replyTo: body.email || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email sending error:", err);
    return NextResponse.json(
      { error: "Could not send your request. Please try again." },
      { status: 500 }
    );
  }
}
