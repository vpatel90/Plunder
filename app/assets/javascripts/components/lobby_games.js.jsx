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
    if (this.state.games.length === 0) {
        return (
          <div className="row no-active-games">
            <h3> No Active Games </h3>
            <h3> Create a New Game to Play </h3>
          </div>
        );
    }else {
        return (
          <div className="row">
            {this.state.games.map(function(game){
                      if (that.state.user === null) {
                        return (
                          <div className="game-card col s12 m6 l4" key={game.id}>
                            <div className="card">
                              <div className="card-content">
                                <div>
                                <h5> {game.name} </h5>
                                <p>Players - {game.player_count}/{game.num_players}</p>
                                <p>Ready Check: {game.start_count}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }else {
                        return (
                          <div className="game-card col s12 m6 l4" key={game.id}>
                            <div className="card">

                              <div className="card-content">
                                <div className="display-inlineblock">
                                  <h5> {game.name} </h5>
                                  <p>Players - {game.player_count}/{game.num_players}</p>
                                  <p>Ready Check: {game.start_count}</p>
                                </div>

                               </div>
                               <div className="card-action">
                                 <JoinLeave key={game.id}
                                            user_game={that.state.user.current_game}
                                            game={game.id}
                                            tick={that.tick}
                                            player_count={game.player_count}
                                            num_players={game.num_players}/>
                               </div>
                          </div>
                          </div>
                        );
                      }
                  })}
          </div>
        );
    }
  }
});
