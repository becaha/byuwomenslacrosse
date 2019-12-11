var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var TeamMember = mongoose.model('TeamMember');

var defaultTeamMembers = [
    {
        name: 'Kallie Rice',
        number: '3',
        position: 'Midfield',
        year: 'Sophomore'
    },
    {
        name: 'Haley Harris',
        number: '5',
        position: 'Attack',
        year: 'Senior'
    },
    {
        name: 'Logan Coon',
        number: '20',
        position: 'Midfield',
        year: 'Senior'
    },
    {
        name: 'Sarah Ludlow',
        number: '10',
        position: 'Attack',
        year: 'Senior'
    },
    {
        name: 'Julia Haws',
        number: '27',
        position: 'Defense',
        year: 'Senior'
    },
    {
        name: 'Kim Meacham',
        number: '19',
        position: 'Defense',
        year: 'Senior'
    }
];

router.param('teamMember', function(req, res, next, id) {
  var query = TeamMember.findById(id);
  query.exec(function (err, teamMember){
    if (err) { return next(err); }
    if (!teamMember) { return next(new Error("can't find teamMember")); }
    req.teamMember= teamMember;
    return next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/players', function(req, res, next) {
  TeamMember.find(function(err, teamMembers){
    if(err){ return next(err); }
    console.log('players', teamMembers);
    if (teamMembers.length == 0) {
        for (const player of defaultTeamMembers) {
            var teamMember = new TeamMember(player);
            console.log('add player', teamMember);
            teamMember.save(function(err, teamMember){
                if(err){ console.error(err); }
                // res.json(teamMember);
              });
        }
    }
    res.json(teamMembers);
  });
});

router.post('/player', function(req, res) {
    var teamMember = new TeamMember(req.body);
    console.log('add player', teamMember);
    teamMember.save(function(err, teamMember){
        if(err){ console.error(err); }
        res.json(teamMember);
      });
}); 

router.delete('/removePlayer/:teamMember',function(req,res) {
  console.log('del', req.teamMember);
  req.teamMember.remove();
  res.sendStatus(200);
});

var Game = mongoose.model('Game');

router.param('game', function(req, res, next, id) {
  var query = Game.findById(id);
  query.exec(function (err, game){
    if (err) { return next(err); }
    if (!game) { return next(new Error("can't find game")); }
    req.game= game;
    return next();
  });
});

router.get('/games', function(req, res, next) {
  Game.find(function(err, games){
    if(err){ return next(err); }
    console.log('games', games);
    res.json(games);
  });
});

router.post('/game', function(req, res) {
    var gameBody = noEmpty(req.body);
    var game = new Game(gameBody);
    console.log('add game', game);
    game.save(function(err, game){
        if(err){ console.error(err); }
        res.json(game);
      });
}); 

var noEmpty = function(gameBody) {
    var noEmptyBody = {};
    noEmptyBody.opponent = gameBody.opponent;
    if (gameBody.date != '') {
        noEmptyBody.date = gameBody.date;
    }
    if (gameBody.time != '') {
        noEmptyBody.time = gameBody.time;
    }
    if (gameBody.loc != '') {
        noEmptyBody.loc = gameBody.loc;
    }
    if (gameBody.city != '') {
        noEmptyBody.city = gameBody.city;
    }
    if (gameBody.score != '') {
        noEmptyBody.score = gameBody.score;
    }
    return noEmptyBody;
}

router.delete('/removeGame/:game',function(req,res) {
  console.log('del', req.game);
  req.game.remove();
  res.sendStatus(200);
});


module.exports = router;
