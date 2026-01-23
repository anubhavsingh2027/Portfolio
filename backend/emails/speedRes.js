export function createSpeedMailTemplate(email) {
return `
 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #ffffff; color: #333;">
    <h1 style="color: #dc2626; margin-bottom: 20px; font-size: 22px; text-align: center;">
      🚀 Fast Response Request
    </h1>
    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
      You can reply directly via email:
    </p>
    <p style="text-align: center; margin-bottom: 20px;">
      <a href="mailto:${email}" style="display: inline-block; padding: 12px 20px; background: #dc2626; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        📧 Reply Now
      </a>
    </p>
    <div style="margin-top: 25px; padding: 10px; background: #f9f9f9; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
      ⚡ Fast-response system notification
    </div>
  </div>
`
};