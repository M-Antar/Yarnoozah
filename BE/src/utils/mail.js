import nodemailer from "nodemailer";

const BRAND = "Yarnoozah";

/* ---------- helpers ---------- */

const egp = (n) => `${Number(n).toLocaleString("en-US")} EGP`;

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ---------- transporter (created on first use so .env is already loaded) ---------- */

let transporter;

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.MAIL_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }
  return transporter;
}

/* ---------- generic send ---------- */

export async function sendMail({ to, subject, text, html }) {
  try {
    const info = await getTransporter().sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    console.log(`Mail sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending mail", error);
    throw error;
  }
}

/* ---------- order email template ---------- */

export function buildOrderEmail(order) {
  const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "201XXXXXXXXX"; // country code, no + and no leading 0
  const INSTAPAY_NUMBER = process.env.INSTAPAY_NUMBER || "01XXXXXXXXX";
  const DEPOSIT_PERCENT = Number(process.env.DEPOSIT_PERCENT) || 0.5;

  const deposit = Math.ceil(order.total * DEPOSIT_PERCENT);
  const remaining = order.total - deposit;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, this is my deposit screenshot for order ${order.orderNumber}.`
  )}`;

  const rows = order.items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #e5e5e5;">${esc(i.title)}<br>
          <span style="color:#666;font-size:12px;">Color: ${esc(i.colorName)}</span></td>
        <td style="padding:10px;border-bottom:1px solid #e5e5e5;text-align:center;">${i.quantity}</td>
        <td style="padding:10px;border-bottom:1px solid #e5e5e5;text-align:right;">${egp(i.price)}</td>
        <td style="padding:10px;border-bottom:1px solid #e5e5e5;text-align:right;">${egp(i.price * i.quantity)}</td>
      </tr>`
    )
    .join("");

  const addr = order.shippingAddress || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#222;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e5e5;">
        <tr><td style="padding:24px;border-bottom:1px solid #e5e5e5;">
          <h1 style="margin:0;font-size:22px;">${BRAND}</h1>
        </td></tr>

        <tr><td style="padding:24px;">
          <p style="margin:0 0 12px;">Dear ${esc(order.customer?.name || "Customer")},</p>
          <p style="margin:0 0 20px;">Thank you for your order <strong>${esc(order.orderNumber)}</strong>. To confirm it, please complete the deposit as described below.</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8e6;border:1px solid #f0d78c;">
            <tr><td style="padding:16px;">
              <p style="margin:0 0 8px;font-weight:bold;">Step 1: Pay the deposit</p>
              <p style="margin:0 0 6px;">Deposit amount: <strong>${egp(deposit)}</strong></p>
              <p style="margin:0 0 6px;">Send it through InstaPay to: <strong>${esc(INSTAPAY_NUMBER)}</strong></p>
              <p style="margin:0 0 12px;">Then send a screenshot of the transfer on WhatsApp to <strong>+${esc(WHATSAPP_NUMBER)}</strong>, mentioning your order number.</p>
              <a href="${waLink}" style="display:inline-block;padding:10px 18px;background:#222;color:#ffffff;text-decoration:none;font-size:14px;">Send screenshot on WhatsApp</a>
              <p style="margin:12px 0 0;font-size:12px;color:#666;">Your order is processed once the deposit is received. The remaining ${egp(remaining)} is paid on delivery.</p>
            </td></tr>
          </table>

          <h2 style="font-size:16px;margin:28px 0 8px;">Order summary</h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
            <tr style="background:#fafafa;">
              <th style="padding:10px;text-align:left;">Item</th>
              <th style="padding:10px;text-align:center;">Qty</th>
              <th style="padding:10px;text-align:right;">Price</th>
              <th style="padding:10px;text-align:right;">Total</th>
            </tr>
            ${rows}
            <tr><td colspan="3" style="padding:8px 10px;text-align:right;">Subtotal</td><td style="padding:8px 10px;text-align:right;">${egp(order.subtotal)}</td></tr>
            ${order.discount ? `<tr><td colspan="3" style="padding:8px 10px;text-align:right;">Discount</td><td style="padding:8px 10px;text-align:right;">-${egp(order.discount)}</td></tr>` : ""}
            <tr><td colspan="3" style="padding:8px 10px;text-align:right;">Shipping</td><td style="padding:8px 10px;text-align:right;">${egp(order.shippingCost)}</td></tr>
            <tr><td colspan="3" style="padding:10px;text-align:right;font-weight:bold;border-top:2px solid #222;">Total</td><td style="padding:10px;text-align:right;font-weight:bold;border-top:2px solid #222;">${egp(order.total)}</td></tr>
          </table>

          <h2 style="font-size:16px;margin:28px 0 8px;">Delivery address</h2>
          <p style="margin:0;font-size:14px;line-height:1.5;">
            ${esc(order.customer?.name || "")}<br>
            ${esc(addr.address || addr.street || "")}<br>
            ${esc(addr.city || "")}${addr.governorate ? ", " + esc(addr.governorate) : ""}<br>
            ${esc(order.customer?.phone || "")}
          </p>
        </td></tr>

        <tr><td style="padding:16px 24px;border-top:1px solid #e5e5e5;font-size:12px;color:#777;">
          This email was sent because an order was placed at ${BRAND}. If this wasn't you, please reply to this email.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    `Dear ${order.customer?.name || "Customer"},`,
    ``,
    `Thank you for your order ${order.orderNumber}.`,
    ``,
    `STEP 1: PAY THE DEPOSIT`,
    `Deposit: ${egp(deposit)}`,
    `Send via InstaPay to: ${INSTAPAY_NUMBER}`,
    `Then send the transfer screenshot on WhatsApp to +${WHATSAPP_NUMBER} with your order number.`,
    `The remaining ${egp(remaining)} is paid on delivery.`,
    ``,
    `ORDER SUMMARY`,
    ...order.items.map((i) => `- ${i.title} (${i.colorName}) x${i.quantity}: ${egp(i.price * i.quantity)}`),
    `Subtotal: ${egp(order.subtotal)}`,
    order.discount ? `Discount: -${egp(order.discount)}` : null,
    `Shipping: ${egp(order.shippingCost)}`,
    `Total: ${egp(order.total)}`,
    ``,
    BRAND,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return {
    subject: `Order ${order.orderNumber} received: deposit required`,
    html,
    text,
  };
}

/* ---------- one call from the controller; never throws ---------- */

export async function sendOrderEmail(order) {
  const to = order?.customer?.email;
  if (!to) return;

  try {
    const { subject, html, text } = buildOrderEmail(order);
    await sendMail({ to, subject, html, text });
  } catch (e) {
    console.error(`Order ${order.orderNumber}: confirmation email failed`, e.message);
  }
}