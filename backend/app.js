// ===== Core modules =====
import dotenv from "dotenv";
dotenv.config();
import express from "express";

// ===== External modules =====
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// ===== Local modules =====
import handleRoutes from "./routes/handle.routes.js";

// ===== App & DB setup =====
const app = express();
const mongoUrl = process.env.dbUrl;
const port = process.env.PORT || process.env.port || 5000;
const environment=process.env.state;
// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ===== CORS setup (CRITICAL) =====
app.use(
  cors({
    origin: [environment=="production"?"https://anubhav.nav-code.com":"http://localhost:5173"]
  }),
);

//test server

// ===== ROUTES =====
app.get("/", (req, res) => {
  res
    .status(200)
    .json("Anubhav Portfolio backend for more visit anubhavsingh.nav-code.com");
});
app.use("/portfolio", handleRoutes);

// ===== Start server =====
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("<======== MongoDB Connected Successfully =======>");
  })
  .catch((err) =>
    console.log("MongoDB unavailable; running without database", err.message),
  );

app.listen(port, () => {
  console.log(`Server Running At http://localhost:${port}`);
});

export default app;
