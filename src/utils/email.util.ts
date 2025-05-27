import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
): Promise<void> => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"LMU Event Management" <${process.env.NODE_MAILER_USER}>`,
    to,
    subject,
    html: htmlContent,
  };

  await mailTransporter.sendMail(mailOptions);
};

export default sendEmail;
