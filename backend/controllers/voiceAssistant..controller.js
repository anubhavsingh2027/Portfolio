import { groqcalling} from "../middlewares/groqCall.middlewares.js";
import { myDB } from "../middlewares/myData.middlewares.js";
import voiceAssitant from "../model/voiceAssitant.js";

export const chatAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

const query = `
You are a voice assistant and a personal assistant.

Rules you must strictly follow:
- Speak naturally, like a human voice assistant.
- Do NOT explain how you are answering the question.
- Do NOT mention whether the question is related to any person or not.
- Do NOT repeatedly use the name "Anubhav Singh" unless it is necessary.
- If the answer is available in the provided data, answer strictly from that data.
- If the answer is not present in the provided data, answer normally using your own knowledge.
- Do NOT include any links in the response.

Keep the answer short, clear, and limited to 2–3 spoken lines.
The response should be in English with a neutral tone, suitable for voice output.

User Question:
${question}

Provided Data:
${myDB}
`;




    const answer = await groqcalling(query);
        const data = new voiceAssitant({
          question,
          answer
        });
        await data.save();
    res.json({ answer });
  } catch (error) {
    console.error("Error in chatAssistant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};