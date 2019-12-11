let teamVue = new Vue({
    el: '#teamVue',
    data: {
        hasTeam: true,
        teamMemberInput: false,
        addError: false,
        errorMessage: '',
        teamMembers: [],
        newName: '',
        newNumber: '',
        newPosition: '',
        newYear: '',
    },
    created: function(){
      this.getPlayers();  
    },
    computed: {
        sortedTeamMembers: function() {
          return this.teamMembers.sort((a,b) => {
              return a.number - b.number;
          });
        },
        validMember: function() {
            if (this.newName !== '' && this.newNumber !== '' && this.newPosition !== '' && this.newYear !== '') {
                let foundMembers = this.teamMembers.filter(member => member.number === this.newNumber);
                if (foundMembers.length === 0) {
                    return true;
                }
                this.errorMessage = 'Number already taken';
            }
            else {
                this.errorMessage = 'Missing Inputs';
            }
            return false;
        }
    },
    methods: {
        async getPlayers() {
          console.log("get players");
          var url = "http://cs260.dnoting.com:8080/players";
          try {
            let response = await axios.get(url);
            this.teamMembers = response.data;
            return true;
          }
          catch (error) {
            console.log(error);
          }
        },
        addTeamMember() {
            var url = "http://cs260.dnoting.com:8080/player";
            if (this.validMember) {
                axios.post(url, {
                    name: this.newName,
                    number: this.newNumber,
                    position: this.newPosition,
                    year: this.newYear
                })
                .then(response => {
                    this.teamMemberInput = false;
                    this.addError = false;
                })
                .catch(e => {
                    console.log(e);
                    this.addError = true;
                });
            }
            else {
                this.addError = true;
            }
            this.newName = '';
            this.newNumber = '';
            this.newPosition = '';
            this.newYear = '';
            this.getPlayers();
        },
        removeTeamMember(teamMember) {
            var index = this.teamMembers.indexOf(teamMember);
              if (index > -1) {
                var url = "http://cs260.dnoting.com:8080/removePlayer/" + teamMember._id;
                axios.delete(url)
                  .then(response => {
                    // console.log(response.data.votes);
                    this.getPlayers();
                  })
                  .catch(e => {
                    console.log(e);
                  });
                console.log("URL " + url);
              }
        }
    },
});
