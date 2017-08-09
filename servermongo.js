// STUDENTS: See near the bottom of this file for your TODO assignment.
// Good luck!

// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "zoo";
var collections = ["animals"];

// var db = mongojs('zoo');

// var mycollection = db.collection('animals');


// console.log("my colletiong - ", mycollection);
// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);
console.log("database is", db);
// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// TODO: Make four routes that display results from your zoo collection

// 0: Root: Displays a simple "Hello World" message (no mongo required)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// 1: All: Send JSON response with all animals
app.get("/all", function(req, res) {
  console.log("gotroute");
  // console.log(mycollection.find({}));
  // Query: In our database, go to the animals collection, then "find" everything
  db.animals.find({}, function(err, data) {
    console.log('data', data);
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
      res.send(err)
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(data);
    }
  });
});

// app.get("weight", function(req, res){
//   db.zoo.find({"weight": }), 
// })

// 2: Name: Send JSON response sorted by name in ascending order
// 3: Weight: Send JSON response sorted by weight in descending order

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
