// Link to our .env file
var dotenv = require("dotenv").config();

// Link to twitter node module
var twitter = require("twitter");

// Link to spotify api node module
var spotify = require("node-spotify-api");

// Link to request node module
var request = require("request");

// Link to built-in fs module for reading files.
var fs = require("fs");

// Link to the keys.js file.
var keys = require("./keys.js");

// Easier way to store the command line arguments.
var processArray = process.argv;
// console.log(processArray);


// This function will read the arguments the user enters into the prompt.
function readCommands() {

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
            break;
        
        // If any other argument is entered, then...
        default:
            console.log("\nPlease enter a valid argument!");
    }

}

// Calling the above function
readCommands();


// Function for displaying tweets
function showTweets() {
    
    var client = new twitter(keys.twitter);

    client.get("statuses/home_timeline", function(error, tweet, response) {
        if (error) {
            return console.log(error);
        }

        // This loop will display the user's top 10 tweets on their board.
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
    })
}


// Function for searching for a song by title on Spotify.
// If no other commands are entered by the user, 
// the function will spotify "The Sign" by the artist "Ace of Base"
function spotifySong() {

    var spotifySearch = new spotify(keys.spotify);

    // empty string to hold the user's song entry
    var song = "";

    // this loop will loop through the user's entered text in the command line and 
    // add all that text to the "song" string variable.
    for (i = 3; i < processArray.length; i++) {
        song = song + " " + processArray[i];
    }

    // if no song is entered, then the song will be set to "The Sign"
    if (song === "") {
        song = "The Sign";
    }

    // spotify method to retrieve song data
    // The parameter "data" will be an object consisting of other objects.
    spotifySearch.search({
        type: "track",
        query: song
    }, function(error, data) {
        if (error) {
            return console.log(error);
        }

        // If a song name was not entered by the user, then...
        if (song === "The Sign") {

            // "Ace of Base" track is here:
            // data.tracks.items[5].artists[0].name

            // data.tracks.items[].artists is an array of objects.
            // each entry in that array is a different artist.


            // this is an array
            var matches = data.tracks.items;

            var bestMatch;

            /* 

            To find which item in data.tracks has the Ace of Base version, I will look at the artists array.
            Each object is an artist.
            To check if "Ace of Base" is one of the artists, I will store each objects' property values into an array,
                and check the string "Ace of Base" against this array.
            If the array contains "Ace of Base," then I have located the proper item index.
            (Item index = i. Artist index = j)

            */
            
            // loop through each of the spotify matches
            Loop1: 
            for (i = 0; i < matches.length; i++) {

                // variable to store the array of artists.
                var artistArray = data.tracks.items[i].artists;
                
                // loop through the artists in the array of artists.
                Loop2:
                for (j = 0; j < artistArray.length; j++) {

                    // this variable will store the values of the current artist's property keys.
                    // one of the keys is "name", and its corresponding value is the name of the artist.
                    var artistValueArray = Object.values(artistArray[j]);

                    // if one of the values is "Ace of Base," then...
                    if (artistValueArray.includes("Ace of Base")) {
                        bestMatch = data.tracks.items[i];                       // stores the proper match for "The Sign" by "Ace of Base."
                        break Loop1;                                            // break out of both loops.
                    }

                    // if not, then the loops will continue.
                    else {
                        continue;
                    }
                    
                }

            }

            
            // Logs all relevant info.
            // console.log(bestMatch);
            console.log("\nName of Track: " + bestMatch.name);
            console.log("Artist: " + bestMatch.artists[0].name);
            console.log("Album: " + bestMatch.album.name);
            console.log("Song Link: " + data.tracks.items[0].external_urls.spotify); 

        }

        // If a song was entered by the user, then...
        else {

            // variable to hold the best match that spotify returns
            var bestMatch = data.tracks.items[0];

            // console.log(bestMatch);

            // If the song exists, then...
            if (bestMatch != null) {

                // displaying the song info to the command prompt
                console.log("\nName of Track: " + bestMatch.name);
                console.log("Artist: " + bestMatch.artists[0].name);
                console.log("Album: " + bestMatch.album.name);
                console.log("Song Link: " + data.tracks.items[0].external_urls.spotify); 
            }

            // If the song does not exist, then... 
            else {
                console.log("Sorry! Track not found!");
            }

        }
        
    })

}

// Function for looking up a movie by name.
function showMovieData() {

    // empty string to hold movie name
    var movie = "";

    var apiKey = "de84cb34";

    // This loop will add each argument the user enters to the "movie" string.
    for (i = 3; i < processArray.length; i++) {
        movie = movie + processArray[i] + "+";
    }

    // If the movie field is left blank, then the info for the movie "Mr. Nobody" will be displayed.
    if (movie === "") {
        movie = "mr+nobody";
    }

    // request to the OMDB API
    request("https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie, function(error, response, body) {
        if (error) {
            return console.log(error);
        }

        // converts the returned body from a string into an object
        var bodyObject = JSON.parse(body);

        // console.log(bodyObject);

        // spacing
        console.log("");

        // If the movie exists, then...
        if (bodyObject.Response==="True") {

            /* 
            NOTE: The reason for all of these "if" statements is because some movies
                    may have some of these fields missing.

                For instance, some movies may not have a Rotten Tomatoes rating or a 
                    listed country in which it was produced.
            */

            // Movie title
            console.log("Title: " + bodyObject.Title);
    
            // Year released
            if (bodyObject.Year != null) {
                console.log("Year: " + bodyObject.Year);
            }
    
            // IMDB Rating
            if (bodyObject.imdbRating != null) {
                console.log("IMDB Rating: " + bodyObject.imdbRating);
            }
    
            // Rotten Tomatoes Rating
            if (bodyObject.Ratings[1] != null) {
                console.log("Rotten Tomatoes Rating: " + bodyObject.Ratings[1].Value);
            }
    
            // Country
            if (bodyObject.Country != null) {
                console.log("Country Produced: " + bodyObject.Country);
            }
    
            // Language(s)
            if (bodyObject.Language) {
                console.log("Language: " + bodyObject.Language);
            }
    
            // Plot
            if (bodyObject.Plot != null) {
                console.log("\nPlot: " + bodyObject.Plot + "\n");
            }
    
            // Actors
            if (bodyObject.Actors != null) {
                console.log("Actors: " + bodyObject.Actors);
            }  
        }

        // If the movie does not exist, then...
        else {
            console.log("Sorry! Movie not found!");
        }

    })
}

// Function for executing the command entered in the "random.txt" file.
function readTheRandomFile() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        // console.log(data);

        // this variable takes the text from the file, trims off excess spacing, and splits the text into 
        // an array, with the separator between elements being a comma.
        var commands = data.trim().split(",");

        // console.log(commands);

        // This if/else statement is to prevent an infinite loop.
        if (commands[0] === "do-what-it-says") {
            console.log("\nNice try...\n");
            throw new Error("Infinite Loop Detected!");
        }

        else {
            // The command that will be read will be set to the first element of the command array.
            processArray[2] = commands[0];
        }

        
        // Any other commands will be covered by commands[1].
        processArray[3] = commands[1];

        // runs the function to read the commands.
        readCommands();
    })
}