import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstNameEn,
      lastNameEn,
      firstNameBg,
      lastNameBg,
      personalId,
      invitedBy,
      docType,
      docNumber,
      docValidThrough,
      email,
      phone,
    } = body;

    const docTypeLabel = docType === "passport" ? "Passport" : "Personal ID";

    await transporter.sendMail({
      from: `"Trip Registrations" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Trip Registration: ${firstNameEn} ${lastNameEn}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1612;">
          <div style="background: #c9522a; padding: 24px 32px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 20px;">New Trip Registration ✈</h1>
          </div>
          <div style="background: #fffdf9; padding: 32px; border: 1px solid #ddd5cc; border-top: none; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #6b6258; width: 180px;">Name (EN)</td><td style="padding: 8px 0; font-weight: 500;">${firstNameEn} ${lastNameEn}</td></tr>
              <tr style="background:#faf8f6;"><td style="padding: 8px 6px; color: #6b6258;">Name (BG)</td><td style="padding: 8px 6px; font-weight: 500;">${firstNameBg} ${lastNameBg}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b6258;">Personal ID</td><td style="padding: 8px 0; font-weight: 500;">${personalId}</td></tr>
              <tr style="background:#faf8f6;"><td style="padding: 8px 6px; color: #6b6258;">Invited By</td><td style="padding: 8px 6px; font-weight: 500;">${invitedBy}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b6258;">Document Type</td><td style="padding: 8px 0; font-weight: 500;">${docTypeLabel}</td></tr>
              <tr style="background:#faf8f6;"><td style="padding: 8px 6px; color: #6b6258;">Document Number</td><td style="padding: 8px 6px; font-weight: 500;">${docNumber}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b6258;">Valid Through</td><td style="padding: 8px 0; font-weight: 500;">${docValidThrough}</td></tr>
              <tr style="background:#faf8f6;"><td style="padding: 8px 6px; color: #6b6258;">Email</td><td style="padding: 8px 6px; font-weight: 500;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b6258;">Phone</td><td style="padding: 8px 0; font-weight: 500;">${phone}</td></tr>
            </table>
            <p style="margin-top: 24px; font-size: 12px; color: #bbb4ac;">Submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Trip form submission error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
