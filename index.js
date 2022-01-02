const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 5055;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.enpeg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log("errrrrrrr", err);
  const userCollection = client.db("userRiders").collection("riders");
  const userInformationCollection = client.db("userRiders").collection("users");
  app.post("/addPost", (req, res) => {
    const post = req.body;
    userCollection.insertOne(post).then((result) => {
      res.send(result.insertedCount > 0);
    });
    console.log(post);
  });

  app.get("/riders", (req, res) => {
    userCollection.find().toArray((err, items) => {
      res.send(items);
      console.log(items);
    });
  });
  ///user-information
  app.post("/addUserInformation", (req, res) => {
    const userInformation = req.body;
    userInformationCollection.insertOne(userInformation).then((result) => {
      res.send(result.insertedCount > 0);
    });
    console.log(userInformation);
  });
});

///browser___status
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
