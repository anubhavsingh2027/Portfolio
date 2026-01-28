import { chatAssistant } from "./service.js";

export function initChatbot() {
  const chatFab = document.getElementById("chatFab");
  const chatbot = document.getElementById("chatbot");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendMessage = document.getElementById("sendMessage");

  // Check access before opening assistant
  if (chatFab) {
    chatFab.addEventListener("click", (e) => {
      e.preventDefault();

      // If user has NOT filled the access form, show access modal
      if (!window.assistantAccessGranted) {
        window.openAssistantAccessModal();
      } else {
        // If user HAS filled the form, show mode selection modal
        const modeModal = document.getElementById("modeModal");
        if (modeModal) {
          modeModal.classList.remove("hidden");
          modeModal.classList.add("active");
        }
      }
    });
  }

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
      // Show loading skeleton
      const loadingMessageId = addChatMessage("", "bot", true);
      const loadingMessage = chatMessages.querySelector(
        `[data-message-id="${loadingMessageId}"]`,
      );

      const data = await chatAssistant({ question: userMessage });

      if (data.error) {
        loadingMessage.remove();
        addChatMessage(
          "Sorry, I couldn't reach the server. Please try again.",
          "bot",
        );
        return;
      }

      // Replace loading skeleton with actual response
      loadingMessage.remove();
      const response = data.answer || data.response || "No response received";
      addChatMessage(response, "bot", false, true);
    } catch (error) {
      addChatMessage("Sorry, something went wrong. Please try again.", "bot");
    }
  }

  // Function to convert URLs to clickable links
  function linkifyText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${url}</a>`;
    });
  }

  // Typewriter effect function with HTML support
  function typewriterEffect(bubble, text, htmlText, speed = 30) {
    let index = 0;
    bubble.innerHTML = "";

    function typeNextCharacter() {
      if (index < text.length) {
        // Build the current text up to this point
        const currentPlainText = text.substring(0, index + 1);
        // Find the corresponding portion of HTML text
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlText;
        const fullHtmlText = tempDiv.innerHTML;

        // Apply linkify and update display
        const displayText = htmlText.substring(
          0,
          findHtmlLength(htmlText, currentPlainText.length),
        );
        bubble.innerHTML = displayText;

        index++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setTimeout(typeNextCharacter, speed);
      } else {
        // When done, show the final version with all links active
        bubble.innerHTML = htmlText;
      }
    }

    typeNextCharacter();
  }

  // Helper function to find the HTML length that corresponds to plain text length
  function findHtmlLength(htmlText, plainTextLength) {
    const tempDiv = document.createElement("div");
    let count = 0;

    for (let i = 0; i < htmlText.length; i++) {
      tempDiv.innerHTML = htmlText.substring(0, i + 1);
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      if (plainText.length >= plainTextLength) {
        return i + 1;
      }
    }
    return htmlText.length;
  }

  function addChatMessage(
    message,
    sender,
    isLoading = false,
    isTypewriter = false,
  ) {
    if (!chatMessages) return;
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message chat-message-${sender}`;

    // Generate unique ID for loading messages
    const messageId = isLoading ? `loading-${Date.now()}` : null;
    if (messageId) {
      messageDiv.setAttribute("data-message-id", messageId);
    }

    const bubble = document.createElement("div");
    bubble.className = `message-bubble message-bubble-${sender}`;

    if (isLoading) {
      bubble.classList.add("loading-skeleton");
      bubble.innerHTML =
        '<span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span>';
    } else {
      // Convert links to clickable anchors
      const linkedText = linkifyText(message);

      if (isTypewriter && sender === "bot") {
        // For typewriter effect, type out the plain text while showing links
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = linkedText;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";

        // Start with empty bubble and type character by character with links
        typewriterEffect(bubble, plainText, linkedText);
      } else {
        bubble.innerHTML = linkedText;
      }
    }

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageId;
  }
}
