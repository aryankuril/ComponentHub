import nodemailer from "nodemailer";

export async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });


  function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toSentenceCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}


  await transporter.sendMail({
    from: `"Website Contact" <${process.env.ADMIN_EMAIL}>`,
    to: "aryan@bombayblokes.com",
    subject: `📩 New Contact: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${toTitleCase(`${data.firstName} ${data.lastName}`)}</p>
      <p><strong>Email:</strong> ${data.email}</p>
     <p><strong>Subject:</strong> ${toTitleCase(data.subject)}</p>
      <p><strong>Message:</strong> ${toSentenceCase(data.message)} </p>
      
    `,
  });
}
