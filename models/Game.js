var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  opponent: String,
  date:  { type: String, default: 'TBD' },
  time:  { type: String, default: '' }, 
  loc:  { type: String, default: 'TBD' },
  city:  { type: String, default: 'TBD' },
  score: { type: String, default: '--' }
});

mongoose.model('Game', GameSchema);
