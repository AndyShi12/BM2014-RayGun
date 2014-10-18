var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = {
	funky_test1: {
		owner: "Michael_Goldman",
		beacons: [],
		players: {
			Michael_Goldman: {
				isHit: false,
				score: 0
			},
			Andy_Shi: {
				isHit: false,
				score: 0
			},
			Conlin_Durbin: {
				isHit: false,
				score: 0
			},
			Kunal_Agrawal: {
				isHit: false,
				score: 0
			}
		},
		score: 0
	}
};

app.post('/shoot', function(req, res){
	var game = req.body.game;
	var player = req.body.player;
	var victim = req.body.victim;

	if (!db[game].players[victim].isHit) {
		db[game].players[victim].isHit = true;
		db[game].players[player].score++;
		res.json({hit: true});
	} else {
		res.json({hit: false});
	};
});

app.post('/checkHits', function(req, res){
	var game = req.body.game;
	var player = req.body.player;

	if (db[game].players[player].isHit) {
		res.json({hit: true}));
		db[game].players[player].isHit = false;
	} else {
		res.json({hit:false});
	};
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});