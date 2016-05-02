var LobbyGames = React.createClass({
  getInitialState: function() {
     return {
       games: [],
       user: null
     };
   },
   tick: function() {
     var that = this;
     var url = '/games';
     $.getJSON(url, function(response){
       that.setState({
         games: response.games,
         user: response.user
       })
     });
   },
   componentDidMount: function() {
     this.tick();
     this.interval = setInterval(this.tick, 1000);
   },
   componentWillUnmount: function() {
     clearInterval(this.interval);
   },
  render: function(){
    var that = this;
    return (
      <div>
        {this.state.games.map(function(game){
                  if (that.state.user === null) {
                    return (
                      <div key={game.id}>
                          {game.name}: {game.player_count}/{game.num_players}
                      </div>
                    );
                  }else {
                    return (
                      <div key={game.id}>
                          {game.name}: Players {game.player_count}/{game.num_players}<br/>
                          Ready Check: {game.start_count} <br/>
                          <JoinLeave key={game.id}
                                     user_game={that.state.user.current_game}
                                     game={game.id}
                                     tick={that.tick}/>
                      </div>
                    );
                  }
              })}
      </div>
    );
  }
});
