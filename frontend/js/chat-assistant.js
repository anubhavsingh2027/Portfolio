import { chatAssistant } from "./service.js";

export function initChatbot() {
  const chatFab = document.getElementById("chatFab");
  const chatbot = document.getElementById("chatbot");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendMessage = document.getElementById("sendMessage");

  if (chatbotClose) {
    chatbotClose.addEventListener("click", (e) => {
      e.preventDefault();
      chatbot.classList.add("hidden");
      chatFab.style.display = "";
    });
  }

  if (sendMessage) {
    sendMessage.addEventListener("click", (e) => {
      e.preventDefault();
      sendChatMessage();
    });
  }

  if (chatInput) {
    chatInput.removeAttribute("readonly");
    chatInput.removeAttribute("disabled");
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendChatMessage();
      }
    });
    chatInput.addEventListener("input", (e) => {});
  }

  function sendChatMessage() {
    // Check if server is awake
    if (!window.serverAwake) {
      addChatMessage(
        "⏳ Server is currently waking up. Please wait a few seconds...",
        "bot",
      );
      // Disable input temporarily
      if (chatInput) {
        chatInput.disabled = true;
        chatInput.placeholder = "Waiting for server...";
        setTimeout(() => {
          chatInput.disabled = false;
          chatInput.placeholder = "Type a message...";
        }, 3000);
      }
      return;
    }

    if (!chatInput) return;
    const message = chatInput.value.trim();
    if (!message) return;
    addChatMessage(message, "user");
    chatInput.value = "";
    setTimeout(() => {
      sendQuestionToAPI(message);
    }, 500);
  }

  async function sendQuestionToAPI(userMessage) {
    try {
      const data = await chatAssistant({ question: userMessage });

      if (data.error) {
        addChatMessage(
          "Sorry, I couldn't reach the server. Please try again.",
          "bot",
        );
        return;
      }

      const response = data.answer || data.response || "No response received";
      addChatMessage(response, "bot");
    } catch (error) {
      console.error("Chat API Error:", error);
      addChatMessage("Sorry, something went wrong. Please try again.", "bot");
    }
  }

  function addChatMessage(message, sender) {
    if (!chatMessages) return;
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message chat-message-${sender}`;

    const bubble = document.createElement("div");
    bubble.className = `message-bubble message-bubble-${sender}`;
    bubble.innerHTML = message;

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
