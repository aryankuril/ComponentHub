import nodemailer from "nodemailer";

export async function sendNewComponentEmail(
  emails: string[],
  componentName: string,
  componentId: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const link = `${process.env.NEXT_PUBLIC_SITE_URL}/components/${componentId}`;

  await transporter.sendMail({
    from: `"Bombay Blokes" <${process.env.ADMIN_EMAIL}>`,
    to: emails,
    subject: "🚀 New Component Released!",
    html: `
      <h2>Hi 👋</h2>
      <p>We’ve just released a new component:</p>
      <h3>${componentName}</h3>
      <a href="${link}">👉 View Component</a>
      <br/><br/>
      <p>Happy coding 🚀</p>
    `,
  });
}
