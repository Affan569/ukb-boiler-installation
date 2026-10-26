import { NextResponse } from "next/server";

// Sirf ek env variable chahiye: QUOTE_TO_EMAIL
// Email FormSubmit.co ke zariye bheji jati hai (koi SMTP / password nahi).
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // honeypot: bots ko chup-chaap success dikha do
    if (body.website) return NextResponse.json({ ok: true });

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const issue = String(body.issue ?? "").trim();
    const message = String(body.message ?? "").trim().slice(0, 2000);

    if (!name || !phone || !issue || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const to = process.env.QUOTE_TO_EMAIL;
    if (!to) {
      console.error("QUOTE_TO_EMAIL is missing in .env.local");
      return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
    }

    const origin = req.headers.get("origin") || new URL(req.url).origin;
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Origin: origin, Referer: origin + "/" },
      body: JSON.stringify({
        _subject: `New quote request: ${issue} (${name})`,
        _replyto: email,
        _template: "table",
        _captcha: "false",
        Name: name,
        Email: email,
        Phone: phone,
        Issue: issue,
        Message: message || "-",
      }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || String(json.success) === "false") {
      console.error("FormSubmit error:", json);
      return NextResponse.json({ error: "Could not send your request. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote form error:", err);
    return NextResponse.json({ error: "Could not send your request. Please try again." }, { status: 500 });
  }
}