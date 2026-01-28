import { groqcalling } from "../middlewares/groqCall.middlewares.js";
import { myDB } from "../middlewares/myData.middlewares.js";
import chatAssist from "../model/chatAssistant.js";

export const chatAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

   const query = `
    You are made answer like for chat assistant .

Strict rules you must follow:
- Do NOT explain how you generate the answer.
- Do NOT mention whether the question is related to any person.
- Do NOT repeatedly use the name "Anubhav Singh" unless it is absolutely necessary.
- If the answer exists, respond ONLY using that information.
- If the answer does not exist, respond using general knowledge.
- Do NOT add statements like "this question is not related" or similar.
- Do NOT use the following words or phrases:
  "provided data", "based on data", "based on provided data".
- Do NOT display raw data, JSON, or database content.
- Keep the response strictly relevant to the question.
- The response should sound like an AI chat assistant, not like a human conversation.
- Keep the answer short and clear (2–5 sentences depending on the question).
- Write the answer in English with a neutral tone.
- You may include relevant links if they are useful.

User Question:
${question}

Provided Data:
${myDB}
`;

    const answer = await groqcalling(query);
    const data = new chatAssist({
      question,
      answer
    });
    await data.save();


    res.json({ answer });
  } catch (error) {
    console.error("Error in chatAssistant:", error);
    res.status(500).json({ error: `Internal server error ${error}` });
  }
};