const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");

const server = require("http").createServer();

const WebSocketServer = require("ws");

const wss = new WebSocketServer.Server({ server: server });

wss.on("connection", function (ws) {
  console.log("new client");
  ws.send(JSON.stringify({ title: "hello", message: "Hi There!" }));
});

server.listen(3000, () => console.log(3000));

app.use(express.json());

const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://testuser:test@testcluster0.kmmkk.gcp.mongodb.net/surveydb?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.wss = wss;

app.get("/testTransaction", (req, res) => {
  wss.clients.forEach(function (client) {
    //if (client.readyState === WebSocketServer.OPEN) {
    client.send(JSON.stringify({ title: "Expense App", subtitle: "INR 100!" }));
  });
  res.send("Testing...");
});

app.use("/api", routes);

app.use("/images", express.static(path.join(__dirname, "uploads")));

app.post("/hellopost", (req, res) => {
  res.send({ body: req.body });
});

app.get("/test", (req, res) => {});

app.get("/helloget", (req, res) => {
  res.send("Hello!");
});

app.listen(1234, () => console.log("Listening on 1234"));
