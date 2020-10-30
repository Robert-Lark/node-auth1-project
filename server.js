const express = require("express");
const session = require("express-session");
const router = require("./routers/router.js");

const server = express();

server.use(express.json());
server.use("/api", router);
server.use(session({
    resave: false,
    saveUninitialized: false, 
    secret: "string"
}))
module.exports = server;
