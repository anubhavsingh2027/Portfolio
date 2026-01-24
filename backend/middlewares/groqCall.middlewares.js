export const groqcalling = async (contentData) => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.groq}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: contentData,
            },
            {
              role: "user",
              content: `User Question: ${contentData}`,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get response from Groq");
    }

    const data = await response.json();
    const assistantResponse = data.choices[0].message.content;
    return assistantResponse;
  } catch (error) {
    console.error("Error in handleVoiceQuery:", error);
    throw error;
  }
};
