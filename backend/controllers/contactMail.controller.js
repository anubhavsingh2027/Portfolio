import {
  createContactTemplateClient,
  createContactTemplatehost,
} from "../emails/contactRes.js";
import { createSpeedMailTemplate } from "../emails/speedRes.js";
import { sendMail } from "../middlewares/mail.middlewares.js";

export const contact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const payload = {
    username: name,
    customerEmail: email,
    phone: phone,
    userSubject: subject,
    userMessage: message,
  };
  const hostMail = createContactTemplatehost(payload);
  const userMail = createContactTemplateClient(name);
  sendMail(hostMail);
  const respo = sendMail(userMail);
  if (respo) {
    return res.status(200).json({
      success: true,
      message: "Thank you for contacting me",
    });
  }
};

export const speedMail = async (req, res) => {
  const { email } = req.body;
  const emailTemplate = createSpeedMailTemplate(email);
  sendMail(emailTemplate);
  return res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
};
