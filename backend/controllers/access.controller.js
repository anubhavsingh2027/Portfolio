import {
  TemplateOfAssistantAccess,
  TemplateOfResumeAccess,
} from "../emails/access.js";
import { sendMail } from "../middlewares/mail.middlewares.js";

export const resumeAccess = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const data = {
      name: name,
      email: email,
      role: role,
    };
    const emailTemplate = TemplateOfResumeAccess(data);
    const Payload = {
      to: "anubhavsinghcustomer@gmail.com",
      subject: "Resume Access",
      websiteName: "Portfolio",
      message: emailTemplate,
    };
    const response = await sendMail(Payload);
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully Send",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to send email",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const assistantAccess = async (req, res) => {
  const { name, email } = req.body;

  try {
    const data = {
      name: name,
      email: email,
    };
    const emailTemplate = TemplateOfAssistantAccess(data);
    const Payload = {
      to: "anubhavsinghcustomer@gmail.com",
      subject: "Assistant Access",
      websiteName: "Portfolio",
      message: emailTemplate,
    };
    const response = await sendMail(Payload);
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully Send",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to send email",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
