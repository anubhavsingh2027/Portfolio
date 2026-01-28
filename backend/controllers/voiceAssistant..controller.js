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
- Do NOT explain how you are answering the question.
- Do NOT mention whether the question is related to any person or not.
- Do NOT repeatedly use the name "Anubhav Singh" unless it is necessary.
- If the answer is available in the provided data, answer strictly from that data.
- If the answer is not present in the provided data, answer normally using your own knowledge.
- Do NOT include any links in the response in any case.
-  if a question i want link in on any project then send like navigate to project section for link.
- Do Not use these word - provided data,based on data,based on provided data.
- do not show any message like json data
- make it properly answer releated question and do not distract related question
- make the answer like doest feel i havw send data.
Keep the answer short, clear, and limited to 2–3 spoken lines.
The response should be in English with a neutral tone.

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