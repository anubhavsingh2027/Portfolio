import {
  createContactTemplateClient,
  createContactTemplatehost,
} from "../emails/contactRes.js";
import { createSpeedMailTemplate } from "../emails/speedRes.js";
import { sendMail } from "../middlewares/mail.middlewares.js";

const sendEmailResponse = (res, mailResult, successMessage, errorMessage) => {
  if (mailResult.success) {
    return res.status(200).json({
      success: true,
      message: successMessage,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const contact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate input
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const payload = {
      username: name,
      customerEmail: email,
      phone: phone,
      userSubject: subject,
      userMessage: message,
    };

    const hostMail = createContactTemplatehost(payload);
    const hostEmailPayload = {
      to: "anubhavsinghcustomer@gmail.com",
      subject: "📩 New Customer Enquiry",
      websiteName: "Anubhav singh Portfolio ",
      message: hostMail,
    };

    await sendMail(hostEmailPayload);

    const userMail = createContactTemplateClient(name);
    const userEmailPayload = {
      to: email,
      subject: "🎉 Thank you for contacting us!",
      websiteName: "Anubhav singh Portfolio ",
      message: userMail,
    };

    const respo = await sendMail(userEmailPayload);

    return sendEmailResponse(
      res,
      respo,
      "Thank you for contacting me",
      "Failed to send confirmation email",
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const speedMail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailTemplate = createSpeedMailTemplate(email);
    const speedPayload = {
      to: "anubhavsinghcustomer@gmail.com",
      subject: "Urgent Message Fast Reply",
      websiteName: "Anubhav singh Portfolio ",
      message: emailTemplate,
    };
    const result = await sendMail(speedPayload);

    return sendEmailResponse(
      res,
      result,
      "Email sent successfully",
      "Failed to send email",
    );
  } catch (err) {
    console.error("Speed mail error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
