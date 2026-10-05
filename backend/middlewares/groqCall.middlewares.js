let lastCallTime = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const groqcalling = async (
  contentData,
  retries = 2,
  { skipRateLimit = false } = {},
) => {
  const now = Date.now();
  if (!skipRateLimit && now - lastCallTime < 2000) {
    return "Please wait a moment before asking again.";
  }
  if (!skipRateLimit) lastCallTime = now;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

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
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: contentData },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API failed with status ${response.status}`);
    }

    const data = await response.json();
    return (
      data?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response."
    );
  } catch (error) {
    if (error.name === "AbortError") {
      return "AI is taking too long. Please try again.";
    }

    if (retries > 0) {
      await sleep(1500);
      return groqcalling(contentData, retries - 1, { skipRateLimit });
    }

    return "AI is temporarily unavailable. Please try again later.";
  } finally {
    clearTimeout(timeout);
  }
};
