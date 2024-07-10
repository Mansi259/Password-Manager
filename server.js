const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { Result } = require("postcss");
var cors = require('cors')
dotenv.config();

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//Database name
const dbname = "passOP";
const port = 3000;
const app = express();
app.use(cors())
app.use(bodyParser.json());
client.connect();


//get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbname );
  const collection = db.collection("passwords");
  // console.log("Found documents =>", findResult);
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
});

//save all the passwords
app.post("/", async (req, res) => {
  const db = client.db(dbname );
  const passwords = req.body;
  const collection = db.collection("passwords");
  // console.log("Found documents =>", findResult);
  const findResult = await collection.insertOne(passwords);
  // res.json(findResult)
  res.send({message: "Data inserted" , result : findResult})
});
 

//delete one password
app.delete("/", async (req, res) => {
  const db = client.db(dbname );
  const passwords = req.body;
  const collection = db.collection("passwords");
  // console.log("Found documents =>", findResult);
  const findResult = await collection.deleteOne(passwords);
  // res.json(findResult)
  res.send({message: "Data inserted" , result : findResult})
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
