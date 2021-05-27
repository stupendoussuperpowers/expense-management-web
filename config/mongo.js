const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://testuser:test@testcluster0.kmmkk.gcp.mongodb.net/surveydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
