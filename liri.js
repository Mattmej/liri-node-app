var dotenv = require("dotenv").config();
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");

var keys = require("./keys.js");


var processArray = process.argv;
// console.log(processArray);

// choices for the different accepted arguments
switch(process.argv[2]) {
    // to display tweets
    case "my-tweets":
        showTweets();
        break;

    // to spotify a song
    case "spotify-this-song":
        spotifySong();
        break;

    // to look up a movie
    case "movie-this":
        showMovieData();
        break;

    // to do what the text file says
    case "do-what-it-says":
        readTheRandomFile();
}

function showTweets() {
    var client = new twitter(keys.twitter);

    client.get("statuses/home_timeline", function(error, tweet, response) {
        if (error) {
            return console.log(error);
        }

        for (i = 0; i < tweet.length; i++) {

            // If you want to check the various properties of the object, uncomment the line below:
            // console.log(tweet[i]);

            console.log("");                                                            // spacing 
            console.log("Poster: " + tweet[i].user.name);                               // poster of the tweet
            console.log("Post: " + tweet[i].text);                                      // the post itself
            console.log("Date Created: " + tweet[i].user.created_at);                   // date the post was created
            console.log("");                                                            // spacing
            console.log("----------------------------------");                          // separator
        }
        // console.log(tweet);
        // JSON.stringify(console.log(tweet), null, 2);
        // console.log(response);
        // JSON.stringify(console.log(response), null, 2);
    })
}

function spotifySong() {

    var spotifySearch = new spotify(keys.spotify);

    // empty string to hold the user's song entry
    var song = "";

    // var test = "this is a test";
    // console.log(test);
    // console.log(processArray[3]);
    // console.log(processArray[4]); 
    // console.log(test + " " + processArray[3]);  

    // this loop will loop through the user's entered text in the command line and 
    // add all that text to the "song" string variable.
    for (i = 3; i < processArray.length; i++) {
        song = song + " " + processArray[i];
    }

    // spotify method to retrieve song data
    spotifySearch.search({
        type: "track",
        query: song
    }, function(error, data) {
        if (error) {
            return console.log(error);
        }

        var bestMatch = data.tracks.items[0];

        // console.log(bestMatch);
        console.log("Name of Track: " + bestMatch.name);
        console.log("Artist: " + bestMatch.artists[0].name);
        console.log("Album: " + bestMatch.album.name);
        console.log("Song Link: " + data.tracks.items[0].external_urls.spotify);
    })

    // spotifySearch.search({
    //     type: "track",
    //     query: song
    // })
    // .then(function(response) {
    //     JSON.stringify(console.log(response.items));
    // })
    // .catch(function(error) {
    //     console.log(error);
    // });

    

}

function showMovieData() {

    var movie = "";

    for (i = 3; i < processArray.length; i++) {
        // movie = movie + " " + processArray[i];
        movie = movie + processArray[i] + "+";
    }

    // console.log(movie);

    request("https://www.omdbapi.com/?apikey=de84cb34&t=" + movie, function(error, response, body) {
        if (error) {
            return console.log(error);
        }

        // console.log("Response:");
        // console.log(response);
        // console.log("------------------------");
        // console.log("Body:");
        // console.log(body);
        // console.log(body.\'Title\');
        // console.log(body.Year);

        // console.log(response.body)
        // var title = "Title";
        // console.log(body.title);

        var bodyObject = JSON.parse(body);

        // console.log(bodyObject);

        console.log("");

        console.log("Title: " + bodyObject.Title);
        console.log("Year: " + bodyObject.Year);
        console.log("IMDB Rating: " + bodyObject.imdbRating);
        console.log("Rotten Tomatoes Rating: " + bodyObject.Ratings[1].Value);
        console.log("Country Produced: " + bodyObject.Country);
        console.log("Language: " + bodyObject.Language);
        console.log("");
        console.log("Plot: " + bodyObject.Plot);
        console.log("");
        console.log("Actors: " + bodyObject.Actors);



        /// maybe use json.parse?
    })
}









