// client side script file for the web scraper mongo application

$(document).ready(function() {

// global variable to hold saved stories
var savedStoriesGlobal = [

	];
// global variable to pass the index of the current story between functions
var indexOfStoryToNote = 0;


// wait for clicks on the buttons
// handling the scrape new click
$(".scrapeNew").on("click", function(event){
	event.preventDefault();
	console.log("got the scrape click");
	$.ajax({
		url:  "/newscrapes",
		type: "POST",
		success: function(data){
			console.log(data);
			$(".displayItems").html("<div class='saveNews'> <input class='btn btn-default save'  type='submit' value='Save'><input class='btn btn-default' type='submit' value='Read Story'>" + data[0].title + "</div>");
			for(i=1; i<data.length; i++){
				$(".displayItems").append("<div class='saveNews'> <input class='btn btn-default save'  type='submit' value='Save'><input class='btn btn-default' type='submit' value='Read Story'>" + data[i].title + "</div>");
			};
				// .data("indexOfArticle", i);
		}
	});
// end get news click            id='" + i + "'
});


// handling the show saved stories click
$(".showSaved").on("click", function(event){
	event.preventDefault();
	console.log("got the show saved click");
	showSavedStories();
})

// handle the show all notes click
// uses the getsaved route, just displayes the notes with the stories
$(".showAllNotes").on("click", function(){
	console.log("got the show all notes click");
	$.ajax({
		url: "getSaved",
		type: "get",
		success: function(data){
			showANote();
			// console.log("got all the notes back");
			// $(".displayItems").html("<div class='savedNews'> <input class='btn btn-default' type='submit' value='Add a Note'>" + data[0].story + "</div><div class='notes'" + data[0].note + "</div>");

			// for (i=1; i<data.length; i++){
			// 	$(".displayItems").append("<div class='savedNews'> <input class='btn btn-default' type='submit' value='Add a Note'>" + data[i].story + "</div><div class='notes'" + data[i].note);
			// }			
		}
	})
});

// http://api.jquery.com/data/
// handling the save click
$(document).on("click", ".saveNews", function(event){
	var indexOfCurrentArticle = $( ".saveNews" ).index( this );
	console.log("value - ");
	console.log(indexOfCurrentArticle);

	// https://stackoverflow.com/questions/15042245/reading-ajax-post-variables-in-node-js-with-express
	$.ajax({
		url: "/save",
	 	type: 'POST',
	 	dataType: "json",
		data: {
			index: indexOfCurrentArticle,
			name: "some text"
		},
		success: function(data){
			console.log("we got the return from the save")
			showSavedStories();
		}
	});
// end save click
});

function showSavedStories() {
	$("h1").html("Steve's Saved Spin Stories");
	$.ajax({
		url: "/getSaved",
		type: 'GET',
		success: function(data){
			console.log("got the saved Stories back");
			savedStoriesGlobal = data;
			$(".displayItems").html("<div class='savedNews'> <input class='btn btn-default' type='submit' value='Add a Note'>" + data[0].story + "</div>")
			for (i=1; i<data.length; i++){
				$(".displayItems").append("<div class='savedNews'> <input class='btn btn-default' type='submit' value='Add a Note'>" + data[i].story + "</div>");
			}
		}
	});
};

// https://stackoverflow.com/questions/13183630/how-to-open-a-bootstrap-modal-window-using-jquery

// For handling the add a note click
$(document).on("click", ".savedNews", function(){
	console.log("got the note click");
	indexOfStoryToNote = $(".savedNews").index(this);
	console.log(indexOfStoryToNote);

	// need to figure out how to pass data to the modal
	$("#myModal").modal('toggle');

});

//handling the add note click
$(".saveNote").on("click", function(event){
	console.log("got the save note click");
	var textData = $(".noteText").val().trim();
	// var tempCurentStory = {
	// 	id: savedStoriesGlobal[indexOfStoryToNote].id,
	// 	story: savedStoriesGlobal[indexOfStoryToNote].story,
	// 	link: savedStoriesGlobal[indexOfStoryToNote].link,
	// 	note: textData
	// };
	$("#myModal").modal('toggle');

	console.log(textData);
	savedStoriesGlobal[indexOfStoryToNote].note = textData;
	showANote();
	// textData.preventDefault();
	$.ajax({
		url: "/saveNote",
		type: 'post',
		data: {
			index: savedStoriesGlobal[indexOfStoryToNote]._id,
			note: textData
		},
		success: function(){
			showANote(indexOfStoryToNote, textData)
		}
	})
})


// displays all saved stories and notes
function showANote (){
	console.log(savedStoriesGlobal);

	$(".displayItems").html(buildRow(savedStoriesGlobal[0]));
	if (savedStoriesGlobal[0].note) {
		$(".displayItems").append("<div>" + savedStoriesGlobal[0].note + "</div>")
	};
	$(".displayItems").append("</div></div>");
	for (i=1; i<savedStoriesGlobal.length; i++){
		$(".displayItems").append(buildRow(savedStoriesGlobal[i]));
		if (savedStoriesGlobal[i].note) {
			$(".displayItems").append("<div>" + savedStoriesGlobal[i].note + "</div>");
		};
		$(".displayItems").append("</div></div>");
	};
};

function buildRow(currentStory){
	var rowToDisplay = [
		"<div class='row'>",
			"<div class='col-md-1 savedNews'> <input class='btn btn-default' type='submit' value='Add a Note'>",
			"</div>",
			"<div class='col-md-10'>",
				"<div>" + currentStory.story + "</div>"
	].join("");
	return rowToDisplay;
};


// end doc ready
});