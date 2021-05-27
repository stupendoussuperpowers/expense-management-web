const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

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

app.use("/api", routes);

app.post("/hellopost", (req, res) => {
  res.send({ body: req.body });
});

app.get("/helloget", (req, res) => {
  res.send("Hello!");
});

app.listen(1234, () => console.log("Listening on 1234"));
