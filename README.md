# liri-node-app

### Description

This project demonstrates how to use node packages and command line arguments to perform various functions.

Specifically, this project allows a user to enter certain commands into a command line in order to perform four functions:
1. Check the last 20 tweets on their Twitter
2. Look up a song of the user's choosing on Spotify
3. Look up the information on a movie of the user's choosing using the _request_ node app and the OMDB API
4. Read the contents of a text file and runs a valid argument in the file.

### Required Items

##### Node Packages
* dotenv (https://www.npmjs.com/package/dotenv)
    * Allows the app to read a .env file.
* Twitter for Node.js (https://www.npmjs.com/package/twitter)
* request (https://www.npmjs.com/package/request)
* Node Spotify API (https://www.npmjs.com/package/node-spotify-api)

##### API Keys (to be entered into an .env file)
* Spotify ID
* Spotify Secret
* Twitter Consumer Key
* Twitter Consumer Secret
* Twitter Access Token Key
* Twitter Access Token Secret

#### Other
* Node.js
* an .env file with the following text:

```
# Spotify API keys

SPOTIFY_ID=[YOUR_SPOTIFY_ID]
SPOTIFY_SECRET=[YOUR_SPOTIFY_SECRET]

# Twitter API keys

TWITTER_CONSUMER_KEY=[YOUR_TWITTER_CONSUMER_KEY]
TWITTER_CONSUMER_SECRET=[YOUR_TWITTER_CONSUMER_SECRET]
TWITTER_ACCESS_TOKEN_KEY=[YOUR_TWITTER_ACCESS_TOKEN_KEY]
TWITTER_ACCESS_TOKEN_SECRET=[YOUR_TWITTER_ACCESS_TOKEN_SECRET]

```

The user must make sure to replace the items in square brackets with their own API keys and to remove the brackets when they enter their own information.

* A keys.js file with the following code: 

```javascript
console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

```

### Details

This app is run by the user via node by entering "node liri.js" into the command line. After entering that command, the user may enter one of the following arguments:
1. my-tweets
2. spotify-this-song
3. movie-this
4. do-what-it-says

If the user attempts to enter any other argument, the app will tell the user to enter a valid argument.

##### my-tweets

This argument displays the most recent 20 tweets on the user's Twitter. Each displayed tweet has the name of the poster, the title of the post, and the date the post was created.

<!-- ![liri_my_tweets]() -->

##### spotify-this-song

This argument can accept additional user input. After typing this argument, the user may enter the name of a song to check on Spotify. The user may include spaces in the song name. If the user does not enter their own song, the app will look up the information for the song "The Sign" by _Ace of Base_.

After the user runs this argument, the following information from Spotify will be returned and printed in the console:
1. The name of the track
2. The artist
3. The album in which the song appeared
4. A link to the song on Spotify

##### movie-this

This argument can accept additional user input as well. After typing this argument, the user may enter the name of a movie. This name may include spaces. After the user runs this argument, the request node package will make a request to the OMDB API and then the API will send back a response. Several items in this response will be displayed in the console. These items include
1. The movie's title
2. The year of the movie's release
3. The movie's rating on IMDB
4. The movie's rating on Rotten Tomatoes
5. The country in which the movie was produced
6. The languages in which the movie was released
7. The movie's plot
8. The main actors in the movie.

If the user does not enter the name of a movie after this argument, the app will display the information for the movie _Mr. Nobody_.

##### do-what-it-says

This argument will read the included random.txt file and run the first arguments in that text file. These arguments must be separated by commas with no spaces included between the comma and the next argument. The following is an example of how to enter the spotify-this-song arguments into the random.txt file:

> spotify-this-song,"I Want it That Way"

If the user enters "do-what-it-says" into the random.txt file, the app will prevent the argument from running in order to prevent an infinite loop.
