import nodemailer from "nodemailer";
import { envVars } from "../config/env";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envVars.USER_EMAIL, 
      pass: envVars.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Fast Track Delivery" <${envVars.USER_EMAIL}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
