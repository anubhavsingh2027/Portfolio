export async function sendMail(data) {
  try {
    const response = await fetch(process.env.emailLink, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      return {
        success: true,
        message: "Email sent successfully",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to send email",
      };
    }
  } catch (err) {
    console.error("Email sending error:", err);
    return {
      success: false,
      message: "Error sending email",
    };
  }
}
