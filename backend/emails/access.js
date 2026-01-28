export function TemplateOfResumeAccess(data) {
  const { name, email, role } = data;

  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #ffffff; color: #333;">

    <h1 style="color: #2563eb; margin-bottom: 20px; font-size: 22px; text-align: center;">
      📄 Resume Access Notification
    </h1>

    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
      Hello,
    </p>

    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
      <strong>${name}</strong> has requested access to your resume.
    </p>

    <div style="padding: 15px; background: #f9fafb; border-radius: 8px; margin-bottom: 20px;">
      <p style="margin: 0 0 8px; font-size: 14px;">
        <strong>👤 Name:</strong> ${name}
      </p>
      <p style="margin: 0 0 8px; font-size: 14px;">
        <strong>📧 Email:</strong> ${email}
      </p>
      <p style="margin: 0; font-size: 14px;">
        <strong>🎓 Role:</strong> ${role}
      </p>
    </div>
    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
      You can contact them directly if you want to proceed further.
    </p>
    <p style="text-align: center;">
      <a href="mailto:${email}" style="display: inline-block; padding: 12px 22px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        ✉️ Contact ${role}
      </a>
    </p>
  </div>
  `;
}

export function TemplateOfAssistantAccess(data) {
  const { name, email } = data;

  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #ffffff; color: #333;">

    <h1 style="color: #16a34a; margin-bottom: 20px; font-size: 22px; text-align: center;">
      🤖 Assistant Access Request
    </h1>
    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
      Hello,
    </p>

    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
      <strong>${name}</strong> has requested access to your assistant.
    </p>
    <div style="padding: 15px; background: #f9fafb; border-radius: 8px; margin-bottom: 20px;">
      <p style="margin: 0 0 8px; font-size: 14px;">
        <strong>👤 Name:</strong> ${name}
      </p>
      <p style="margin: 0; font-size: 14px;">
        <strong>📧 Email:</strong> ${email}
      </p>
    </div>
    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
      You may reach out directly if you wish to continue the conversation.
    </p>
     <p style="text-align: center;">
      <a href="mailto:${email}" style="display: inline-block; padding: 12px 22px; background: #16a34a; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        ✉️ Contact User
      </a>
    </p>
  </div>
  `;
}