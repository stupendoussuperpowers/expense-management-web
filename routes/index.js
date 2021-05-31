const app = require("express").Router();
const transaction = require("../model/Transaction");
const group = require("../model/Group");
const user = require("../model/User");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const short = require("short-uuid");

app.post("/addTransaction", upload.single("image"), async (req, res) => {
  console.log(req.file);
  const newTrans = await transaction.create({
    user: req.body.user,
    groupID: req.body.groupID,
    amount: req.body.amount,
    memo: req.body.memo,
    image: req.file.filename,
    recurring: req.body.recurring,
  });

  req.app.wss.clients.forEach(function (client) {
    //if (client.readyState === WebSocketServer.OPEN) {
    client.send(
      JSON.stringify({
        title: "Expense App",
        subtitle: `Transaction of INR ${req.body.amount}`,
        group: req.body.group,
      })
    );
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

  console.log(creator);
  console.log(newGroup);
  console.log(creatorDoc);

  creatorDoc.groups.push(newID);
  creatorDoc.save();

  res.send({ success: true, body: newID });
});

app.post("/joinGroup", async (req, res) => {
  const groupP = await group.find({ groupID: req.body.groupID });
  const groupDoc = groupP[0];

  if (!groupDoc) {
    res.send({ success: false, body: "Invalid Code" });
  }

  const joiner = await user.find({ userID: req.body.userID });
  const joinerDoc = joiner[0];

  joinerDoc.groups.push(req.body.groupID);
  await joinerDoc.save();

  res.send({ success: true, body: "Joined" });
});

app.get("/userGroups/:id", async (req, res) => {
  console.log(req.params.id);
  const groupee = await user.find({ userID: req.params.id });
  console.log(groupee);
  const groupeeDoc = groupee[0];

  if (!groupeeDoc) {
    return res.send({ success: false, body: "User Not Found" });
  }

  var responseList = await Promise.all(
    groupeeDoc.groups.map(async (x) => {
      const groupDeets = await group.find({ groupID: x });
      const groupDoc = groupDeets[0];
      console.log(x, groupDoc);
      return { groupID: groupDoc.groupID, groupName: groupDoc.groupName };
    })
  );

  console.log(responseList);
  res.send({ success: true, body: responseList });
});

app.get("/group/:id", async (req, res) => {
  const groupID = req.params.id;

  const groupDeets = await group.find({ groupID: groupID });
  const groupDoc = groupDeets[0];

  const gtrans = await transaction.find({ groupID: groupID, recurring: false });
  console.log("Hello", gtrans);

  const recurringTrans = await transaction.find({
    groupID: groupID,
    recurring: true,
  });

  const total = await transaction.aggregate([
    {
      $match: {
        recurring: false,
      },
    },
    {
      $group: {
        _id: "$groupID",
        net: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const recTotal = await transaction.aggregate([
    {
      $match: {
        recurring: true,
      },
    },
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

  var temp = total.find((x) => x._id == groupID);
  var rec = recTotal.find((x) => x._id == groupID);

  res.send({
    success: true,
    body: {
      groupName: groupDoc.groupName,
      transactions: gtrans,
      net: temp ? temp.net : 0,
      recurring: recurringTrans,
      recNet: rec ? rec.net : 0,
    },
  });
});

app.get("/transaction/:id", async (req, res) => {
  console.log(req.params.id);
  const transactionDeets = await transaction.find({ _id: req.params.id });
  const currTrans = transactionDeets[0];

  res.send({
    success: true,
    id: req.params.id,
    amount: currTrans.amount,
    memo: currTrans.memo,
    imagePath: currTrans.image,
    createdAt: currTrans.createdAt,
  });
});

module.exports = app;
//aDJWDWbWfkFTS4mg24FJdP
