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

function setMovie(title, runTime, peeTimes) {
  console.log(title, runTime, peeTimes);
}



request("http://m.runpee.com", function(error, response, html) {
  console.log("Here");
  if(!error) {
    var $ = cheerio.load(html);
    $("p a[href^='peeTime.php']").each(function(i, e) {
      var title = e.children[0].data;
      var runTime = getQueryVariable("runningTime", e.attribs.href);
      request("http://m.runpee.com/"+e.attribs.href, function(error, response, html) {
        var $ = cheerio.load(html);
        var bodyText = $("body").text().match(/(<<<Return to movie list)[\s\S]*(<<<Return to movie list)/g)[0].slice("<<<Return to movie list".length, -"<<<Return to movie list".length);
        var peeTime = [];
        var match;
        var regex = /PeeTime ([0-9]) of ([0-9])\n?([0-9]+) minutes into movie = ([0-9]+) minute Peetime/g;
        while((match = regex.exec(bodyText)) !== null) {
            peeTime.push({
              when: match[3],
              length: match[4]
            });
        }
        setMovie(title, runTime, peeTime);
      });
    });
  }
})
