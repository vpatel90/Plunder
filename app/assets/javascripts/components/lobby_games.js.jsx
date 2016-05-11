var LobbyGames = React.createClass({
  getInitialState: function() {
     return {
       games: [],
       user: null
     };
   },
   tick: function() {
     if (this.state.user !== null && this.state.user.game_started === true){
       var url = '/games/' + this.state.user.current_game;
       window.location.replace(url);
     }else {
       var that = this;
       var url = '/games';
       $.getJSON(url, function(response){
         that.setState({
           games: response.games,
           user: response.user
         })
       });
     }
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
      <div className="row">
        {this.state.games.map(function(game){
                  if (that.state.user === null) {
                    return (
                      <div className="game-card card col s12 m6 l4" key={game.id}>
                        <div className="card-content">
                          <h5> {game.name} </h5>
                          <p>Players - {game.player_count}/{game.num_players}</p>
                          <p>Ready Check: {game.start_count}</p>
                        </div>
                      </div>
                    );
                  }else {
                    return (
                      <div className="card" key={game.id}>
                          <h5> {game.name} </h5>
                          <p>Players - {game.player_count}/{game.num_players}</p>
                          <p>Ready Check: {game.start_count}</p>
                          <JoinLeave key={game.id}
                                     user_game={that.state.user.current_game}
                                     game={game.id}
                                     tick={that.tick}
                                     player_count={game.player_count}
                                     num_players={game.num_players}/>
                                     <hr />
                                     <br/>
                      </div>
                    );
                  }
              })}
      </div>
    );
  }
});
