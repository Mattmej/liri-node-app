# liri-node-app

### Description

This project demonstrates how to use node packages and command line arguments to perform various functions.

Specifically, this project allows a user to enter certain commands into a command line in order to perform four functions:
1. Check the last 20 tweets on their Twitter
2. Look up a song of the user's choosing on Spotify
3. Look up the information on a movie of the user's choosing using the _request_ node application and the OMDB API
4. Read the contents of a text file and runs a valid argument in the file.

### Required Items

##### Node Packages
* dotenv (https://www.npmjs.com/package/dotenv)
    * Allows the application to read a .env file.
* Twitter for Node.js (https://www.npmjs.com/package/twitter)
* request (https://www.npmjs.com/package/request)
    * Allows the application to communicate with websites.
* Node Spotify API (https://www.npmjs.com/package/node-spotify-api)

#### Other
* Node.js (https://nodejs.org/en/)
* A _Spotify for Developers_ account (https://developer.spotify.com/dashboard/login)
* A _Twitter Developers_ account (https://developer.twitter.com/en)




### Installation

Make sure that the latest version of _Git_ is installed to your operating system, then navigate to the directory where you wish to install the application and run the following command on the command line:

> git clone https://github.com/Mattmej/liri-node-app.git

After downloading the application, navigate to the root of the application and install the required Node packages by following each package's installation instructions.

### Setup

First, the user should create a new file in the root of the application directory. This file will be named _.env_. The file contents will be as follows:

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

The user will replace the items in square brackets with their own API keys, which will be obtained by following the instructions below.

The user's next step will be to obtain the necessary tokens for this application to function. 

#### Obtaining Twitter Keys

After creating a _Twitter Developer_ account, the user must log in to Twitter then access the Twitter Developer Portal Dashboard at https://developer.twitter.com/en/portal/dashboard. From there, they will select the _Projects & Apps_ option from the leftmost sidebar, then select the _Overview_ sub-option. The user will then click the "Create App" button at the bottom of the page.

![twitter_developer_overview](https://github.com/Mattmej/liri-node-app/blob/master/pics/Twitter/twitter_developer_overview.png)
  

The webpage will prompt the user to give their new application a name. The user can enter any name they wish.

![Name_Your_App](https://github.com/Mattmej/liri-node-app/blob/master/pics/Twitter/Name_Your_App.png)
  

Upon finishing the application's creation, the page will display the user's _API Key and API Secret_. The user should copy these keys down and save them for later. __The user has the option to view these keys later if they forget, but this option will not be available starting January 12, 2021__. 

![API_Key_and_Secret](https://github.com/Mattmej/liri-node-app/blob/master/pics/Twitter/API_Key_and_Secret.png)
  

From this screen, the user should once again use the leftmost sidebar to select the _Projects & Apps_ option, then the user should select their applicaton under the _Standalone Apps_ sub-section. After reaching their application's page, the user should click on the _Keys and tokens_ tab at the top of the page.

![To_App_Settings](https://github.com/Mattmej/liri-node-app/blob/master/pics/Twitter/To_App_Settings.png)
  

At the bottom of the page, the user will see a box under the _Authentication Tokens_ section. Inside the box will be an option to generate an access token and secret. The user will click on the _generate_ button to generate these tokens.

![Generate_Access_Token_and_Secret](https://github.com/Mattmej/liri-node-app/blob/master/pics/Twitter/Generate_Access_Token_and_Secret.png)
  

Clicking the _generate_ button will open a pop-up window with the user's generated access token and secret. The user should copy these keys down so that they can be used later.

![Your_New_Access_Token_And_Secret](https://github.com/Mattmej/liri-node-app/blob/master/pics/Twitter/Your_New_Access_Token_And_Secret.png)
  

Now that the user has copied their API key, API secret, access token, and access secret, they can begin to add these items to the application. 

The user will navigate to their _.env_ file. Under the _Twitter API Keys_ section, they will enter their keys into the respective fields, _making sure to remove the square brackets_. Here are where the user's keys should be entered:
* \[YOUR_TWITTER_CONSUMER_KEY\] = API Key
* \[YOUR_TWITTER_CONSUMER_SECRET\] = API Secret
* \[YOUR_TWITTER_ACCESS_TOKEN_KEY\] = Access Token
* \[YOUR_TWITTER_ACCESS_TOKEN_SECRET\] = Access Token Secret

The user has now completed entering in their Twitter information. They will proceed to enter in their Spotify information.
  

#### Obtaining Spotify Keys

After creating a _Spotify for Developers_ account, the user should navigate to the _Spotify for Developers_ webpage and click on the "Dashboard" link at the top of the page. Doing so will redirect the user to a page where they can create a new application. The user will then click on the "Create App" button at the top-right of the webpage.

![Spotify_Create_App](https://github.com/Mattmej/liri-node-app/blob/master/pics/Spotify/Spotify_Create_App.png)

Clicking on the "Create App" button will cause a pop-up window to appear, asking for details about the application the user wishes to create. The user can name the application whatever they wish; the main purpose of this step is to retrieve a client ID and secret given via the creation of the application. After the user enters an application name and agrees with the terms of service, they can click the "create" button.

![Spotify_App_Popup](https://github.com/Mattmej/liri-node-app/blob/master/pics/Spotify/Spotify_App_Popup.png)

Upon creating the application, the user will be redirected to the application's page. Here, the user can view their client ID and client secret. These two items are synonymous with an access token and secret. The user should save these items for entry into the _.env_ file. 

![Spotify_App_Page](https://github.com/Mattmej/liri-node-app/blob/master/pics/Spotify/Spotify_App_Page.png)

Now that the user has copied their client ID and client secret, they will navigate to their _.env_ file and enter the information into the relevent fields under the _Spotify API Keys_ section. Once again, the user should make sure to remove the square brackets in each field. Here are wiere the user's keys should be entered: 
* \[YOUR_SPOTIFY_ID\] = Client ID
* \[YOUR_SPOTIFY_SECRET\] = Client Secret

Now that the user has entered all of their information into the _.env_ file, they can now run the application.

### Details

This application is run by the user via node by entering "node liri.js" into the command line. After entering that command, the user may enter one of the following arguments:
1. my-tweets
2. spotify-this-song
3. movie-this
4. do-what-it-says

If the user attempts to enter any other argument, the application will tell the user to enter a valid argument.

##### my-tweets

This argument displays the most recent 20 tweets on the user's Twitter. Each displayed tweet has the name of the poster, the title of the post, and the date the post was created.

![liri_my_tweets](https://github.com/Mattmej/liri-node-app/blob/master/gifs/liri_my_tweets.gif)

<br/>
<br/>

##### spotify-this-song

This argument can accept additional user input. After typing this argument, the user may enter the name of a song to check on Spotify. The user may include spaces in the song name. If the user does not enter their own song, the application will look up the information for the song "The Sign" by _Ace of Base_.

![liri_spotify_default](https://github.com/Mattmej/liri-node-app/blob/master/gifs/liri_spotify_default.gif)

<br/>
<br/>

After the user runs this argument, the following information from Spotify will be returned and printed in the console:
1. The name of the track
2. The artist
3. The album in which the song appeared
4. A link to the song on Spotify

![liri_spotify_search](https://github.com/Mattmej/liri-node-app/blob/master/gifs/liri_spotify_search.gif)

<br/>
<br/>

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

![liri_movie_search](https://github.com/Mattmej/liri-node-app/blob/master/gifs/liri_movie_search.gif)

<br/>
<br/>

If the user does not enter the name of a movie after this argument, the application will display the information for the movie _Mr. Nobody_.

![liri_movie_default](https://github.com/Mattmej/liri-node-app/blob/master/gifs/liri_movie_default.gif)

<br/>
<br/>

##### do-what-it-says

This argument will read the included random.txt file and run the first arguments in that text file. These arguments must be separated by commas with no spaces included between the comma and the next argument. The following is an example of how to enter the spotify-this-song arguments into the random.txt file:

> spotify-this-song,"I Want it That Way"

![liri_do_what_it_says](https://github.com/Mattmej/liri-node-app/blob/master/gifs/liri_do_what_it_says.gif)

<br/>
<br/>

If the user enters "do-what-it-says" into the random.txt file, the application will prevent the argument from running in order to prevent an infinite loop.

![liri_no_infinite_loop](https://github.com/Mattmej/liri-node-app/blob/master/gifs/liri_no_infinite_loop.gif)
