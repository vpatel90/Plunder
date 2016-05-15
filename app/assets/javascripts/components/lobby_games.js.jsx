var LobbyGames = React.createClass({
  getInitialState: function() {
     return {
       games: null,
       user: null,
       current_game: null,
       current_players: [],
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
         if (response.current_game === undefined) {
           var current_game = null;
           var current_players = [];
         }else {
           var current_game = response.current_game
           var current_players = response.current_players
         }
         that.setState({
           games: response.games,
           user: response.user,
           current_game: current_game,
           current_players: current_players
         })
       });
     }
   },
   componentDidMount: function() {
     this.tick();
     this.interval = setInterval(this.tick, 3000);
   },
   componentWillUnmount: function() {
     clearInterval(this.interval);
   },

   renderCurrentGame: function () {
     var that = this;
     if (this.state.current_game !== null) {
       return (
         <div className="row">
           <div className="my-game game-card col s12 m12 l12">
             <div className="card">

               <div className="card-content">
                 <div className="display-inlineblock">
                   <h5> {this.state.current_game.name} </h5>
                   {this.state.current_players.map(function(player){
                     var ready = 'Not Ready'
                     if (player.ready) { ready = 'Ready'};
                     return (<div className="display-inlineblock generic-text gamecard-players" key={player.id}>{player.user_name} <i className='right'>{ready}</i> </div>)
                   })}
                 </div>

                </div>
                <div className="card-action">
                  <JoinLeave
                             user_game={this.state.user.current_game}
                             game={this.state.current_game.id}
                             tick={that.tick}
                             player_count={this.state.current_game.player_count}
                             num_players={this.state.current_game.num_players}
                             />
                </div>
              </div>
           </div>
         </div>
       );
     }else {
       return (
          <div />
       );
     }
   },
   renderCreateGameBtn: function() {
     if (this.state.user !== null && this.state.current_game === null){
       $("#create_game").removeClass("hide-me");
     }else {
       $("#create_game").addClass("hide-me");
     }
   },
  render: function(){
    var that = this;
    if (this.state.games === null) {
      return (
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
      );
    } else if (this.state.games.length === 0) {
        return (
          <div className="row no-active-games">
            <h3> No Active Games </h3>
            <h3> Create a New Game to Play </h3>
          </div>
        );
    } else {
        return (
          <div>
            {this.renderCreateGameBtn()}
            {this.renderCurrentGame()}
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
                      }else if (that.state.current_game !== null && that.state.current_game.id === game.id){
                        return (
                            <span />
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
          </div>
        );
    }
  }
});
