var express = require('express');
var router = express.Router();

var teamMembers = [
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/players',function(req,res,next) {
    console.log("backend get players");
    res.send(teamMembers);
});

router.post('/player', function(req, res) {
    console.log("backend player post");
    console.log(req.body);
    teamMembers.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 

router.post('/removePlayer', function(req, res) {
    console.log("backend remove player post");
    console.log(req.body);
    teamMembers = teamMembers.filter(member => {
        return member.number !== req.body.number;
    });
    res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 

module.exports = router;
