<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Email Integration Setup

The website uses Nodemailer with Gmail for sending emails from all forms (contact, quote, newsletter).

### Required Environment Variables

Add these to your `.env` file:

```bash
# Gmail Configuration
GMAIL_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password

# Optional: Recipient email (defaults to GMAIL_EMAIL if not set)
RECIPIENT_EMAIL=info@ukbboilerinstallation.co.uk
```

### How to Generate Gmail App Password

1. Go to [Google Account settings](https://myaccount.google.com/)
2. Enable 2-Step Verification if not already enabled
3. Go to Security > App Passwords
4. Click "Select app" → Choose "Mail"
5. Click "Select device" → Choose "Other (Custom name)"
6. Enter a name like "UKB Boiler Website"
7. Click "Generate"
8. Copy the 16-character password (without spaces) and paste it as `GMAIL_APP_PASSWORD`

### Email API Endpoints

- **POST /api/send-email** - Handles all email submissions
  - Types: `quote`, `contact`, `newsletter`
  - Sends beautifully formatted HTML emails with table layout
  - Includes timestamp and all form data

### Forms Using Email Integration

1. **Contact Form** (`/contactus`) - Sends type: "contact"
2. **Quote Modal** (across all pages) - Sends type: "quote"
3. **Footer Newsletter** - Sends type: "newsletter"
4. **Blog Newsletter** - Sends type: "newsletter"

### Email Format

All emails are sent as HTML with:
- Professional branded header
- Table layout for form data
- Timestamp of submission
- Responsive design
- Branded footer
