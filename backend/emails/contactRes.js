export function createContactTemplatehost(data) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #ffffff; color: #333;">
    <h2 style="color: #6d28d9; margin-bottom: 16px;">📩 New Customer Enquiry</h2>
    <p style="line-height: 1.6; font-size: 15px; margin-bottom: 8px;">
      <strong>Name:</strong> ${data.username}
    </p>
    <p style="line-height: 1.6; font-size: 15px; margin-bottom: 8px;">
      <strong>Email:</strong> <a href="mailto:${data.customerEmail}" style="color: #6d28d9; text-decoration: none;">${data.customerEmail}</a>
    </p>
    <p style="line-height: 1.6; font-size: 15px; margin-bottom: 8px;">
      <strong>Phone:</strong> ${data.phone}
    </p>
    <p style="line-height: 1.6; font-size: 15px; margin-bottom: 8px;">
      <strong>Subject:</strong> ${data.userSubject}
    </p>
    <p style="line-height: 1.6; font-size: 15px; margin-top: 16px;"><strong>Message:</strong></p>
    <blockquote style="border-left: 4px solid #6d28d9; margin: 12px 0; padding-left: 12px; color: #444; font-style: italic; background: #fafafa; border-radius: 4px;">
      ${data.userMessage}
    </blockquote>
    <div style="margin-top: 25px; padding: 10px; background: #f9f9f9; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
      🚀 Sent from Contact Form
    </div>
  </div>
  `;
}

export function createContactTemplateClient(username) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff; color: #333;">
    <h2 style="color: #6d28d9; margin-bottom: 18px; font-size: 22px;">Hello ${username}, 👋</h2>

    <p style="line-height: 1.7; font-size: 15px; margin-bottom: 14px;">
      Thank you for reaching out — your message has been successfully received!
    </p>

    <p style="line-height: 1.7; font-size: 15px; margin-bottom: 14px;">
      I truly appreciate your interest, and I'll get back to you as soon as possible.
    </p>

    <p style="line-height: 1.7; font-size: 15px; margin-bottom: 14px;">
      While you wait, feel free to take a look at my work and online presence:
    </p>

    <ul style="padding-left: 18px; margin-bottom: 18px; font-size: 15px; line-height: 1.7;">
      <li><a href="https://github.com/anubhavsingh2027" target="_blank" style="color: #6d28d9; text-decoration: none;">GitHub Projects</a></li>
      <li><a href="https://www.linkedin.com/in/anubhav-singh-09b71829b/" target="_blank" style="color: #6d28d9; text-decoration: none;">LinkedIn</a></li>
      <li><a href="https://anubhav.nav-code.com/" target="_blank" style="color: #6d28d9; text-decoration: none;">Portfolio Website</a></li>
    </ul>

    <p style="line-height: 1.7; font-size: 15px;">
      Thanks again for getting in touch — talk soon!
    </p>

    <p style="line-height: 1.7; font-size: 15px; margin-top: 24px;">
      Warm regards,<br/>
      <strong style="color:#000;">Anubhav Singh</strong>
    </p>

    <div style="margin-top: 28px; padding: 12px; background: #f9f9f9; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
      ✉️ Sent from <strong>Anubhav Portfolio</strong>
    </div>
  </div>
  `
};

