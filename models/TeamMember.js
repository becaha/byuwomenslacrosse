var mongoose = require('mongoose');

var TeamMemberSchema = new mongoose.Schema({
  name: String,
  number: Number, 
  position: String,
  year: String
});

mongoose.model('TeamMember', TeamMemberSchema);
