// The database controller for the web scrape mongo application home work 16

var mongojs = require("mongojs");
// Database configuration
// Save the URL of our database and the name of our collection
var databaseUrl = "spinnewsdb";
var collections = ["spinnews"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);
console.log(db);
// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});


exports.save = function(req, res, data){
	console.log("in the database controller")
	console.log(data);

	db.spinnews.insert({"story": data.title, "link": data.link }, function(err, data){
		if (err){
			console.log("err on the database write")
		} else {
			console.log("sucess writing data");
			res.send(data);
		}
		});
// end save stories
};

exports.getSaved = function(req, res){
	console.log("in the get saved database function");
	db.spinnews.find({}, function(err, data){
		if (err){
			console.log("database error in the get saved")
		} else {
			console.log("succes reading database");
			console.log(data);
			res.send (data);
		}
	});
// end getsaved
};

// Adds a single note to the database at location index
exports.saveANote = function(req, res, index, newNote){
	console.log("In the save a note db function");
	// index = "ObjectId('" + index + "')";
	console.log(index, newNote);
	// db.spinnews.update({_id: index }, {$set: {"note": newNote}}, function(err, data){
// db.spinnews.update({"_id": ObjectId("59887abbb9cf95231cb6ff35")}, {$set: {"note": "THis is a newer changed note"}}
db.spinnews.update({_id: index}, {$set: {"note": newNote}}, function(err, data){

// Headline.update({ _id: query._id }, {$set: query}, {}, cb);

		if (err){
			console.log("database error updating new note")
		} else {
			console.log("success saving new note");
			console.log(data);
			res.send (data);
		}
	});
};





