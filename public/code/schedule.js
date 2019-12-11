let teamVue = new Vue({
    el: '#scheduleVue',
    data: {
        hasGames: true,
        gameInput: false,
        addError: false,
        errorMessage: '',
        games: [],
        newOpponent: '',
        newDate: '',
        newTime: '',
        newLoc: '',
        newCity: '',
        newScore: '',
    },
    created: function(){
      this.getGames();  
    },
    computed: {
        sortedGames: function() {
          return this.games.sort((a,b) => {
              return a.number - b.number;
          });
        },
        validGame: function() {
            if (this.newOpponent !== '') {
                return true;
            }
            else {
                this.errorMessage = 'Missing Inputs';
                return false;
            }
        }
    },
    methods: {
        async getGames() {
          console.log("get games");
          var url = "http://cs260.dnoting.com:8080/games";
          try {
            let response = await axios.get(url);
            this.games = response.data;
            console.log(this.games);
            return true;
          }
          catch (error) {
            console.log(error);
          }
        },
        addGame() {
            var url = "http://cs260.dnoting.com:8080/game";
            if (this.validGame) {
                axios.post(url, {
                    opponent: this.newOpponent,
                    date: this.newDate,
                    time: this.newTime,
                    loc: this.newLoc,
                    city: this.newCity,
                    score: this.newScore
                })
                .then(response => {
                    this.gameInput = false;
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
            this.newOpponent = '';
            this.newDate = '';
            this.newTime = '';
            this.newLoc = '';
            this.newCity = '';
            this.newScore = '';
            this.getGames();
        },
        removeGame(game) {
            var index = this.games.indexOf(game);
              if (index > -1) {
                var url = "http://cs260.dnoting.com:8080/removeGame/" + game._id;
                axios.delete(url)
                  .then(response => {
                    this.getGames();
                  })
                  .catch(e => {
                    console.log(e);
                  });
                console.log("URL " + url);
              }
        }
    },
});
