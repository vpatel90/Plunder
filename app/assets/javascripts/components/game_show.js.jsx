var GameShow = React.createClass ({
    getInitialState: function() {
       return {
         other_players: [],
         user_player: null,
         game: null,
         board: null,
         board_ships: []
       };
     },
     tick: function() {
         var that = this;
         var url = document.URL;
         $.getJSON(url, function(response){
           that.setState({
             other_players: response.other_players,
             user_player: response.user_player,
             game: response.game,
             board: response.board,
             board_ships: response.board_ships
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
              <div className="row">
              <div className="col player-list">

                {this.state.other_players.map(function(player){
                  return (
                      <ShowPlayer key={player.id}
                              name={player.user_name}
                              card_count={player.card_count}
                              score={player.score}
                              game_turn={that.state.game.player_turn}
                              player_id={player.id} />
                        );

                })}
              </div>
                <div className="container center">
                  {this.state.board_ships.map(function(ship){
                    return (
                        <BoardMerchant key={ship.id}
                                      category={ship.category}
                                      color={ship.color}
                                      value={ship.value}
                                      ship_id={ship.id}
                                      leader_name={ship.leader_name}
                                      lead_cannons={ship.lead_cannons}
                                      player_id={that.state.user_player.id}
                                      blue_pirates={ship.blue_pirates}
                                      green_pirates={ship.green_pirates}
                                      purple_pirates={ship.purple_pirates}
                                      gold_pirates={ship.gold_pirates}  />
                    );
                  })}
                </div>

              </div>

          </div>
        );
    }
});
