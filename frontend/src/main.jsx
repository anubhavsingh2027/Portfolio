import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/rubiksCube.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// // Track new user visit
// window.addEventListener("load", () => {
//   const params = new URLSearchParams(window.location.search);
//   const source = params.get("source");
//   fetch(`https://app.chatting.nav-code.com/detector/newUser/portfolio?source=${source || 'Direct'}`, {
//     method: "GET",
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       // User visited
//     })
//     .catch((err) => {
//       // Visit tracking failed
//     });
// });
