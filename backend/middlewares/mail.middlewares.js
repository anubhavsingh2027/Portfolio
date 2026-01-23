export async function sendMail(data) {
  try {
    const response = await fetch(process.env.emailLink, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        message: "Contact Send Successfully",
      };
    }
  } catch (err) {
    return {
      success:false
    }
  }
}
