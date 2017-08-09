// The server file for the web scrape, mongo database application

var cheerio = require("cheerio");
var request = require("request");

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// app.use(express.bodyParser);

// for BodyParser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Serve static content from the 'public' directory
app.use(express.static('public'));

// set up the port
var PORT = process.env.PORT || 3000;

var arrayOfArticles = [];

// routes here
// var routes = require('./controllers/scrapecontroller.js');

app.post('/newscrapes', function(req, res){
  console.log("we got the post");
  // Make a request call to grab the HTML body from the site of your choice
  request("http://www.spin.com", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    // var results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $(".preview-holder").each(function(i, element) {

      var link = $(element).children().attr("href");
      var title = $(element).children("a").text();

      // Save to an object and push an array
      arrayOfArticles.push({
        title: title,
        link: link
      });
    });

    // Log the arrayOfArticles once you've looped through each of the elements found with cheerio
    console.log(arrayOfArticles);
    res.send(arrayOfArticles);
  });
});

var dbstuff = require("./controllers/databasecontroller.js");

app.post("/save", function(req, res){
  console.log("we got the save route");
  console.log("index - ");
  console.log(req.body.index);
  var storyToSaveIndex = req.body.index;
  // console.log(req.body.name);
  console.log(arrayOfArticles[storyToSaveIndex]);
  dbstuff.save(req, res, arrayOfArticles[storyToSaveIndex], function(err, data){
    res.send(data);
  });

  // , req.body);

// end save post  
})

app.get('/getSaved', function(req, res){
  dbstuff.getSaved(req, res, function(err, data){
    console.log("got back from the get saved");
    res.send(data);
  })
})


// route to handle add a note
app.post('/saveNote', function(req, res){
  console.log("in the server at save note");
  console.log(req.body.note);
  console.log(req.body.index);
  dbstuff.saveANote(req, res, req.body.index, req.body.note, function(err, data){
    console.log("should never see this log")
  })
})


// var app = express.createServer();
// app.use(express.bodyParser());
// app.post('/search', function(req, res){
//    search_form = req.body;  // <-- search items
//    MySearch.doSearch(search_form,function(err,items) {
//        res.send(items);
//    });
// });


// // Make a request call to grab the HTML body from the site of your choice
// request("http://www.spin.com", function(error, response, html) {

//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(html);

//   // An empty array to save the data that we'll scrape
//   var results = [];

//   // Select each element in the HTML body from which you want information.
//   // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//   // but be sure to visit the package's npm page to see how it works
//   $(".preview-holder").each(function(i, element) {

//     var link = $(element).children().attr("href");
//     var title = $(element.a).children().text();

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//       title: title,
//       link: link
//     });
//   });

//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });


app.listen(PORT, (err) => {
  if (!err) {
    console.log('Site is live listening on PORT', PORT);
  } else console.log(err);
});
