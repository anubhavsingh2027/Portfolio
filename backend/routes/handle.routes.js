// External Module
const express = require("express");
const handleAcess = express.Router();

// controllers
const acessHandler= require("../controllers/hello.controller");
const acessHandler= require("../controllers/chatAssistant.controller");
const acessHandler= require("../controllers/voiceAssistant..controller");
const acessHandler= require("../controllers/contactMail.controller");

handleAcess.get("/", adminResourcesSetController.createCar);
acessHandler.post("/", adminResourcesSetController.deleteCar);
acessHandler.post("/chatAssistant", adminResourcesSetController.createPackage);
acessHandler.post("/voiceAssistant",adminResourcesSetController.deletepackage);
acessHandler.post("/contact",)
acessHandler.post("/speedResponse",)



module.exports = handleAcess;