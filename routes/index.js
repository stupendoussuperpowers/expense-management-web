const app = require("express").Router();
const transaction = require("../model/Transaction");
const group = require("../model/Group");
const user = require("../model/User");

const short = require("short-uuid");

app.post("/addTransaction", async (req, res) => {
  const newTrans = await transaction.create({
    user: req.body.user,
    groupID: req.body.groupID,
    amount: req.body.amount,
    memo: req.body.memo,
  });

  res.send({ success: true, body: "Added Transaction" });
});

//f9Lta3B8BniVB9zSP1iuG4
app.post("/createTestUser", async (req, res) => {
  const newID = short.generate();

  const newUser = await user.create({
    userID: newID,
    groups: [],
    password: "haha",
  });

  await newUser.save();
  console.log(newUser);
  res.send({ success: true, body: newID });
});

app.post("/createGroup", async (req, res) => {
  const newID = short.generate();

  const newGroup = await group.create({
    groupID: newID,
    groupName: req.body.groupName,
  });

  const creator = await user.find({ userID: req.body.userID });
  const creatorDoc = creator[0];

  creatorDoc.groups.push(newID);
  creatorDoc.save();

  res.send({ success: true, body: newID });
});

app.post("/joinGroup", async (req, res) => {
  const group = await group.find({ groupID: req.body.groupID });
  const groupDoc = group[0];

  if (!groupDoc) {
    res.send({ success: false, body: "Invalid Code" });
  }

  const joiner = await user.find({ userID: req.body.userID });
  const joinerDoc = joiner[0];

  joinerDoc.groups.push(req.body.groupID);

  res.send({ success: true, body: "Joined" });
});

app.get("/userGroups", async (req, res) => {
  const groupee = user.find({ userID: req.body.userID });
  const groupeeDoc = groupee[0];

  var responseList = [];

  groupeeDoc.groups.map(async (x) => {
    const groupDeets = await group.find({ groupID: x });
    const groupDoc = groupDeets[0];
    responseList.push({
      groupID: groupDoc.groupID,
      groupName: groupDoc.groupName,
    });
  });

  res.send({ success: true, body: responseList });
});

app.get("/group/:id", async (req, res) => {
  const groupID = req.params.id;

  const groupDeets = await group.find({ groupID: groupID });
  const groupDoc = groupDeets[0];

  const gtrans = await transaction.find({ groupID: groupID });

  const total = await transaction.aggregate([
    {
      $group: {
        _id: "$groupID",
        net: {
          $sum: "$amount",
        },
      },
    },
  ]);

  console.log(total);

  res.send({
    success: true,
    body: {
      groupName: groupDoc.groupName,
      transactions: gtrans,
    },
  });
});

module.exports = app;
//aDJWDWbWfkFTS4mg24FJdP
