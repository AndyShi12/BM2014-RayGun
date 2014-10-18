var Firebase = require("firebase");
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var myFirebaseRef = new Firebase("https://runpee-pebble.firebaseio.com/");

function getQueryVariable(variable, url) {
  var query = url;
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

request("http://m.runpee.com", function(error, response, html) {
  if(!error) {
    var $ = cheerio.load(html);
    $("p a[href^='peeTime.php']").each(function(i, e) {
      movie = {};
      movie.title = e.children[0].data;
      movie.runTime = getQueryVariable("runningTime", e.attribs.href);
      request("http://m.runpee.com/"+e.attribs.href, function(error, response, html) {
        var $ = cheerio.load(html);
        console.log($("body").text().match(/(<<<Return to movie list)[\s\S]*(<<<Return to movie list)/g)[0].slice("<<<Return to movie list".length, -"<<<Return to movie list".length));
      });
      console.log(movie);
    });
  }
})
