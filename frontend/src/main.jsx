import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/rubiksCube.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// Track one anonymous visit per page load without collecting contact details.
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const rawSource = params.get("source")?.trim();
  const source = rawSource ? rawSource.slice(0, 100) : "Direct";
  const analyticsUrl = new URL(
    "https://app.chatting.nav-code.com/detector/newUser/portfolio",
  );
  analyticsUrl.search = new URLSearchParams({ source }).toString();

  fetch(analyticsUrl.toString(), { method: "GET" }).catch(() => {
    // Analytics failure must never affect portfolio access.
  });
});
