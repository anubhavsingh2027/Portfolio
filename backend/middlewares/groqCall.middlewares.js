// Node 18+ (Render default) me fetch available hota hai

let lastCallTime = 0;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const groqcalling = async (contentData, retries = 2) => {
  // 🔒 Basic rate limit (voice spam se bachane ke liye)
  const now = Date.now();
  if (now - lastCallTime < 2000) {
    return "Please wait a moment before asking again.";
  }
  lastCallTime = now;

  // ⏱ Timeout controller
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10 sec

  try {
    if (!process.env.groq) {
      throw new Error("Groq API key missing in environment variables");
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.groq}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content: "You are a helpful voice assistant.",
            },
            {
              role: "user",
              content: contentData,
            },
          ],
        }),
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      throw new Error(`Groq API failed with status ${response.status}`);
    }

    const data = await response.json();

    return (
      data?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response."
    );

  } catch (error) {
    console.log(error);
    clearTimeout(timeout);

    // ⏳ Timeout case
    if (error.name === "AbortError") {
      console.error("Groq request timed out");
      return "AI is taking too long. Please try again.";
    }

    // 🔁 Retry logic
    if (retries > 0) {
      console.warn("Retrying Groq call...", retries);
      await sleep(1500);
      return groqcalling(contentData, retries - 1);
    }

    console.error("Groq call failed:", error.message);
    return "AI is temporarily unavailable. Please try again later.";
  }
};