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
You are made answer like for  voice assistant .

Strict rules you must follow:
- Do NOT explain how you generate the answer.
- Do NOT mention whether the question is related to any person.
- Do NOT repeatedly use the name "Anubhav Singh" unless it is absolutely necessary.
- If the answer exists, respond ONLY using that information.
- If the answer does not exist, respond using general knowledge.
- Do NOT include any links in the response.
- If a link is requested, respond with: "Please navigate to the project section for the link."
- Do NOT use the following words or phrases:
  "provided data", "based on data", "based on provided data".
- Do NOT display raw data, JSON, or database-related messages.
- Keep the response strictly relevant to the question.
- The answer should not sound like data was supplied.
- Keep the response short and clear (2–5 sentences depending on the question).
- Write the response in English with a neutral tone.
- The response should sound suitable for a voice assistant.


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