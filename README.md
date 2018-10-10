# liri-node-app
Language Interpretation and Recognition Interface

This is a fun little app that takes a specific command and query value from the user. Then, depending on the command, will make a request to the proper API and display specific results from the returned data. The API's used are spotify, bands in town, and the OMDB API. There is also a command which will take text from a local .txt file and use that information to run the app. Lastly, the app will keep a running log of every command as well the data that is extrapolated.

If the query value is more than one word, it should be contained in quotation marks.
For example, `node liri.js spotify-this-song "What about us"`, as opposed to `node liri.js movie-this jaws`.

After typing `node liri.js`, here are the commands:

## **spotify-this-song** [*song title*]
I ran the app using `node liri.js spotify-this-song "What about us"`
![gif of spotify-this-song](/images/spotify-this.gif)

## **movie-this** [*movie title*]
I ran the app using `node liri.js movie-this jaws`
![gif of movie-this](/images/movie-this.gif)

## **concert-this** [*artist/band name*]
I ran the app using `node liri.js concert-this skrillex`
![gif of concert-this](/images/concert-this.gif)

## **do-what-it-says**
Here you can see the `random.txt` file open, the text of which I will use to run the app.
![gif of do-what-it-says](/images/do-what-it-says.gif)

## *log feature*
Here I demonstrate how the `log.txt` file is updated when I run the app.
![gif of log feature](/images/log-this.gif)