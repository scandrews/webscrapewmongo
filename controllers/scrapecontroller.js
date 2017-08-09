// Routes for the web scrape mongo application

module.exports = function(){


//route for start
app.get('/', function(){
	console.log("startup post");
	res.render("index");
})


app.post('/newscrapes', function (req, res){
	console.log("we got the post");
	// Make a request call to grab the HTML body from the site of your choice
	request("http://www.spin.com", function(error, response, html) {

	  // Load the HTML into cheerio and save it to a variable
	  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
	  var $ = cheerio.load(html);

	  // An empty array to save the data that we'll scrape
	  var results = [];

	  // Select each element in the HTML body from which you want information.
	  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
	  // but be sure to visit the package's npm page to see how it works
	  $(".preview-holder").each(function(i, element) {

			var link = $(element).children().attr("href");
			var title = $(element.a).children().text();

			// Save these results in an object that we'll push into the results array we defined earlier
			results.push({
				title: title,
				link: link
			});
		});

		// Log the results once you've looped through each of the elements found with cheerio
		console.log(results);
		res.send(results);
	});
// end post
});

// end export
};