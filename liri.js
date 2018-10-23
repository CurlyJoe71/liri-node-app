require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var request = require('request');
var moment = require('moment');
var fs = require('fs');

var command = process.argv[2];
var input = process.argv[3];

var movieQueryUrl = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=trilogy';
var concertQueryUrl = 'https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp&date=upcoming';

checkCommand();

function appendFile(text) {
    fs.appendFile('log.txt', text + ', ', function (err) {
        if (err) {
            return console.log(err);
        }
    })
};

function checkCommand() {
    switch (command) {
        case 'concert-this':
            appendFile(command);
            concertQuery();
            break;
        case 'spotify-this-song':
            appendFile(command);
            spotifyQuery();
            break;
        case 'movie-this':
            appendFile(command);
            movieQuery();
            break;
        case 'do-what-it-says':
            appendFile(command);
            doThis();
            break;
        default:
            console.log(`You didn't use a proper command, dude.`);
    };
}

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
            var title = parsedBody.Title;
            var year = parsedBody.Year;
            var rating = parsedBody.imdbRating;
            var rottenRating = parsedBody.Ratings[1].Value;
            var country = parsedBody.Country;
            var language = parsedBody.Language;
            var plot = parsedBody.Plot;
            var actors = parsedBody.Actors;
            console.log('The title is: ' + title);
            console.log('The year it came out is: ' + year);
            console.log('The IMDB rating is: ' + rating);
            console.log('The Rotten Tomatoes rating is: ' + rottenRating);
            console.log('The country in which it was produced is: ' + country);
            console.log('The language of the movie is: ' + language);
            console.log('Here\s a synopsis: ' + plot);
            console.log('The cast of the movie includes: ' + actors);
            appendFile(title);
            appendFile(year);
            appendFile(rating);
            appendFile(rottenRating);
            appendFile(country);
            appendFile(language);
            appendFile(plot);
            appendFile(actors);
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
            var location = venue.city + ', ' + venue.region;
            console.log('This artist is playing at: ' + venue.name);
            console.log('This concert will take place in: ' + location);
            console.log('They will playing on: ' + formattedDateTime);
            appendFile(venue.name);
            appendFile(formattedDateTime);
            appendFile(location);
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
            appendFile(artistName);
            appendFile(songTitle);
            appendFile(songLink);
            appendFile(albumName);
        });
};

function doThis() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err)
        }
        var array = data.split(',');
        command = array[0];
        input = array[1];
        checkCommand();
    })
};