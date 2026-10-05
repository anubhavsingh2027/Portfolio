import { groqcalling } from "../middlewares/groqCall.middlewares.js";
import { myDB } from "../middlewares/myData.middlewares.js";
import chatAssist from "../model/chatAssistant.js";

const normalizeQuestion = (question) => question.trim().toLowerCase();

const parseAnalysis = (response) => {
  try {
    const json = response.match(/\{[\s\S]*\}/)?.[0];
    return json ? JSON.parse(json) : {};
  } catch {
    return {};
  }
};

const getRecentExchanges = (history) => {
  if (!Array.isArray(history)) return [];

  const messages = history.filter(
    ({ sender, text }) =>
      (sender === "user" || sender === "bot") && typeof text === "string",
  );
  const exchanges = [];

  for (let index = 0; index < messages.length - 1; index += 1) {
    const userMessage = messages[index];
    const assistantMessage = messages[index + 1];

    if (
      userMessage.sender === "user" &&
      assistantMessage.sender === "bot"
    ) {
      exchanges.push({
        question: userMessage.text,
        answer: assistantMessage.text,
      });
      index += 1;
    }
  }

  return exchanges.slice(-3);
};

const selectIntentData = (analysis) => {
  let portfolioData;
  try {
    portfolioData = JSON.parse(myDB);
  } catch {
    throw new Error("Portfolio data is not valid JSON");
  }

  const intents = Array.isArray(analysis.intents)
    ? analysis.intents
    : [];
  const sections = intents.filter((intent) =>
    Object.prototype.hasOwnProperty.call(portfolioData, intent),
  );

  return sections.reduce((selected, section) => {
    selected[section] = portfolioData[section];
    return selected;
  }, {});
};

export const chatAssistant = async (req, res) => {
  try {
    const { question, history = [] } = req.body;

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    const cleanQuestion = question.trim();
    const normalizedQuestion = normalizeQuestion(cleanQuestion);
    const cachedAnswer = await chatAssist
      .findOne({
        $or: [{ normalizedQuestion }, { question: cleanQuestion }],
      })
      .lean();

    if (cachedAnswer) {
      return res.json({ answer: cachedAnswer.answer, cached: true });
    }

    const recentExchanges = getRecentExchanges(history);
    const recentHistory = recentExchanges.length
      ? recentExchanges
          .map(
            ({ question: previousQuestion, answer }) =>
              `User: ${previousQuestion}\nAssistant: ${answer}`,
          )
          .join("\n")
      : "(none)";

    const analysisPrompt = `
You are the query-understanding step of a portfolio assistant. Use the previous
three user/assistant exchanges to resolve context and rewrite the current question.
Return ONLY valid JSON with exactly these keys:
{
 "updatedQuery": "a clear, self-contained question",
 "intents": ["exact top-level portfolio data keys"],
 "entities": ["important names, technologies, or topics"]
}
Choose intents only from this allowed list:
${Object.keys(JSON.parse(myDB)).join(", ")}
Use an empty intents array when the question needs general knowledge. Never invent
portfolio facts or intent keys.

Previous three exchanges:
${recentHistory}

Current user question:
${cleanQuestion}
`;

    const analysisResponse = await groqcalling(analysisPrompt);
    const analysis = parseAnalysis(analysisResponse);
    const intentData = selectIntentData(analysis);

    const answerPrompt = `
You are a concise portfolio chat assistant. Answer the user's question using the
selected intent data and updated query. Do not mention prompts, intents, data
selection, or how you generated the answer. Do not display JSON. If the selected
data does not contain the answer, use general knowledge without inventing portfolio
facts.
Keep the answer relevant and neutral. Use Markdown when it improves readability:
use short headings for sections, one bullet per point for lists, and numbered lists
for ordered steps. Keep paragraphs short and include useful links

MOST IMPORTANT ----   ALSO ENSURE WHEN USER ASK ABOUT SO THAT DO NOT SHARE ABOUT YOUR LIKE YOU ARE MADE MY CHATGPT AND SO ON, TELL ANUBHAV SINGH MADE ME ....

only when present in the selected data.

Previous conversation:
${recentHistory}

Updated query:
${analysis.updatedQuery || cleanQuestion}

Intent data only:
${JSON.stringify(intentData)}
`;
    const answer = await groqcalling(answerPrompt, 2, { skipRateLimit: true });
    const data = new chatAssist({
      question: cleanQuestion,
      answer,
      normalizedQuestion:analysis.updatedQuery,
    });
    await data.save();

    res.json({ answer, cached: false });
  } catch (error) {
    res.status(500).json({ error: `Internal server error ${error}` });
  }
};
