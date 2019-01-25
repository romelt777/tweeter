"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }



  //we have a connection to the "test-tweets" db, starting here
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //typical node callback style, any program logic that needs the
  //to use the connection will be called within here.
  // or
  //this is an entry point for a database connected app !


//function is specific to get tweets from database .
  function getTweets(callback){
    db.collection("tweets").find().toArray((err, results) => {
      if(err) {
        return callback(err);
      }

      callback(null, tweets);
    });
  }


  getTweets((err, tweets) => {
    if(err) throw err;


    console.log("logging each tweet:");

    for(let tweet of tweets) {
      console.log(tweet);
    }



    //at the end , close the connection.
    db.close();


  });





});

