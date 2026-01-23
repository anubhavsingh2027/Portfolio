// ===== Core modules =====
require('dotenv').config();
const express = require('express');


// ===== External modules =====
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// ===== Local modules =====
const handleRoutes = require('./routes/handle.routes');


// ===== App & DB setup =====
const app = express();
const mongoUrl = process.env.MONGO_URI;
const port = process.env.port;

// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ===== CORS setup (CRITICAL) =====
app.use(cors({
  origin: ["https://anubhav.nav-code.com"]
}));


//test server



// ===== ROUTES =====
app.use("/portfolio", handleRoutes);




// ===== Start server =====
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("<======== MongoDB Connected Successfully =======>");
    app.listen(port, () => {
      console.log(`Server Running At http://localhost:${process.env.port}`);
    });
  })
  .catch(err => console.log("Error connecting MongoDB", err));
