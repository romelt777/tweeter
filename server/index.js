"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));





//setting up the mongo database
const Mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// let db;
//connecting to mongo db
MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`success connect: ${MONGODB_URI}`);

//sending database to datahelpers.
  const DataHelpers = require("./lib/data-helpers.js")(db);


  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

});


app.listen(PORT, () => {
  console.log("Tweeter's app listening on port " + PORT);
});
