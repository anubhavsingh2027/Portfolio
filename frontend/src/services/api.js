const API_URL = "https://anubhav-portfolio-backend.onrender.com/portfolio/";

const handleFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return { error: true, message: "Network Error" };
  }
};

export const wakeup = () => handleFetch("");

export const chatAssistant = (data) =>
  handleFetch("chatAssistant", {
    method: "POST",
    body: JSON.stringify({ question: data.question }),
  });

export const voiceAssistant = (data) =>
  handleFetch("voiceAssistant", {
    method: "POST",
    body: JSON.stringify({ question: data.question }),
  });

export const contact = (data) =>
  handleFetch("contact", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const speedResponse = (data) =>
  handleFetch("speedResponse", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const assistantAccess = (data) =>
  handleFetch("assitantAccess", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resumeAccess = (data) =>
  handleFetch("resumeAccess", {
    method: "POST",
    body: JSON.stringify(data),
  });
