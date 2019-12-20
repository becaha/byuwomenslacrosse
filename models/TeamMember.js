var mongoose = require('mongoose');

var TeamMemberSchema = new mongoose.Schema({
  name: String,
  number: Number, 
  position: String,
  year: String
});

TeamMemberSchema.methods.nextSeason = function(p) {
  switch(p.year) {
    case 'Freshman':
      p.year = 'Sophomore';
      break;
    case 'Sophomore':
      p.year = 'Sophomore';
      break;
    case 'Junior':
      p.year = 'Sophomore';
      break;
  }
  if (p.year == 'Senior') {
    this.delete(p);
  }
  else {
    this.save(p);
  }
};

mongoose.model('TeamMember', TeamMemberSchema);
