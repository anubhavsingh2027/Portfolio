const apiurl = "https://anubhav-portfolio-backend.onrender.com/portfolio/";

export async function wakeup() {
  try {
    const response = await fetch(`${apiurl}`);

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: true, message: "Network Error " };
  }
}

export async function chatAssistant(data) {
  try {
    const response = await fetch(`${apiurl}chatAssistant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: data.question }),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return { error: true, message: "Network Error " };
  }
}

export async function voiceAssistant(data) {
  try {
    const response = await fetch(`${apiurl}voiceAssistant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: data.question }),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return { error: true, message: "Network Error " };
  }
}

export async function contact(data) {
  try {
    const response = await fetch(`${apiurl}contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return { error: true, message: "Network Error " };
  }
}

export async function speedResponse(emailData) {
  try {
    const response = await fetch(`${apiurl}speedResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return { error: true, message: "Network Error " };
  }
}

export async function assistantAccess(Data) {
  try {
    const response = await fetch(`${apiurl}assitantAccess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return { error: true, message: "Network Error " };
  }
}

export async function resumeAccess(Data) {
  try {
    const response = await fetch(`${apiurl}resumeAccess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return { error: true, message: "Network Error " };
  }
}
