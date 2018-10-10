require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api')
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
var request = require('request');
var moment = require('moment');
var fs = require('fs');

var command = process.argv[2];
var input = process.argv[3];

var movieQueryUrl = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=trilogy';
var concertQueryUrl = 'https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp&date=upcoming';

switch (command) {
    case 'concert-this':
        concertQuery();
        break;
    case 'spotify-this-song':
        spotifyQuery();
        break;
    case 'movie-this':
        movieQuery();
        break;
    case 'do-what-it-says':
        doThis();
        break;
    default:
        console.log(`You didn't use a proper command, dude.`);
};

//formatting shortcuts
var header = '======= The Liri Bot found this: =======';

function movieQuery() {
    if (input === undefined) {
        input = 'Mr. Nobody';
    }
    request(movieQueryUrl, function (err, res, body) {
        if (err) {
            return console.log(err);
        }
        if (res.statusCode === 200) {
            var parsedBody = JSON.parse(body);
            console.log(header);
            console.log('The title is: ' + parsedBody.Title);
            console.log('The year it came out is: ' + parsedBody.Year);
            console.log('The IMDB rating is: ' + parsedBody.imdbRating);
            console.log('The Rotten Tomatoes rating is: ' + parsedBody.Ratings[1].Value);
            console.log('The country in which it was produced is: ' + parsedBody.Country);
            console.log('The language of the movie is: ' + parsedBody.Language);
            console.log('Here\s a synopsis: ' + parsedBody.Plot);
            console.log('The cast of the movie includes: ' + parsedBody.Actors);
        }
    })
};

function concertQuery() {
    request(concertQueryUrl, function (err, res, body) {
        if (err) {
            return console.log(err);
        }
        if (res.statusCode === 200) {
            console.log(header);
            var venue = JSON.parse(body)[0].venue;
            var dateTime = JSON.parse(body)[0].datetime;
            var formattedDateTime = moment(dateTime).format('MM DD YYYY');
            console.log('This artist is playing at: ' + venue.name);
            console.log('They will playing on: ' + formattedDateTime);
        }
    });
};

function spotifyQuery() {
    if (input === undefined) {
        input = 'The Sign';
    }
    spotify.search(
        {
            type: 'track',
            query: input,
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log(header);
            var artistName = data.tracks.items[0].album.artists[0].name;
            var songTitle = data.tracks.items[0].name;
            var songLink = data.tracks.items[0].href;
            var albumName = data.tracks.items[0].album.name;
            console.log('The artist who made this song is: ' + artistName);
            console.log('The title of the songs is: ' + songTitle);
            console.log('If you\'d like a link to this track: ' + songLink);
            // console.log()
            console.log('The name of the album from which this song comes is: ' + albumName);
        });
};

function doThis() {
    
}