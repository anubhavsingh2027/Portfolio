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
You are a chat assistant and a personal assistant.

Rules you must strictly follow:
- Do NOT explain how you are answering the question.
- Do NOT mention whether the question is related to any person or not.
- Do NOT repeatedly use the name "Anubhav Singh" unless it is necessary for the answer.
- If the answer exists in the provided data, answer ONLY from that data.
- If the answer is not present in the provided data, answer normally using your own knowledge.
- Do NOT add extra statements like "this question is not related" or similar explanations.
- Do Not use these word - provided data,based on data,based on provided data.
- do not show any message like json data
- make it properly answer releated question and do not distract related question
- make the answer like doest feel i havw send data.
You may include relevant links if they are useful.
Keep the response short and clear (2–3 lines maximum).
Write the answer in English with a neutral tone.

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