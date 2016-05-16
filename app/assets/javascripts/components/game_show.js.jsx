var GameShow = React.createClass ({
    getInitialState: function() {
       return {
         other_players: [],
         user_player: null,
         game: null,
         board: null,
         board_ships: [],
         notifications: [],
         new_notifications: [],
         valid_ships: [],
         turn_start: 0
       };
     },

     handleResponse: function(response) {
       var that = this;
       var diff = that.state.notifications.map(function(n){
         return n.id;
       });
       var new_diff = []
       var lastFive = _.last(response.notifications, [5])
       lastFive.map(function(n){
         if (_.some(diff, function(i) { return i === n.id})){

         }else {
           new_diff.push(n);
         }
       });
       that.setState({
         other_players: response.other_players,
         user_player: response.user_player,
         game: response.game,
         board: response.board,
         board_ships: response.board_ships,
         new_notifications: new_diff,
         notifications: response.notifications,
         valid_ships: response.valid_ships,
         turn_start: response.turn_start
       });
     },
     tick: function() {
         var that = this;
         var url = document.URL + "?card_id=" + store.current_card;
         $.getJSON(url, function(response){
           that.handleResponse(response);
           setTimeout(that.tick(), 500);
         });
         this.toastNotifications();

     },
     toastNotifications: function() {
       this.state.new_notifications.map(function(notification){
         Materialize.toast(notification.body, 4000)
       });
       this.setState({
         new_notifications: []
       });
     },
     componentDidMount: function() {
       this.tick();
      //  this.interval = setInterval(this.tick, 1000);
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
                              player_id={player.id}
                              user_id={that.state.user_player.id}
                              portrait={player.portrait} />
                        );

                })}
              </div>
                <div className="container center main-game-board">
                  <GameOver game={this.state.game}
                            players={this.state.other_players}
                            />
                  <TurnAnnouncer player={this.state.user_player}
                                 game={this.state.game}
                                 turn_start={this.state.turn_start}
                                 />
                  <div className="ships-on-board">
                  {this.state.board_ships.map(function(ship){
                    return (
                        <BoardMerchant key={ship.id}
                                      category={ship.category}
                                      color={ship.color}
                                      value={ship.value}
                                      ship_id={ship.id}
                                      leader_portrait={ship.leader_portrait}
                                      lead_cannons={ship.lead_cannons}
                                      player_id={that.state.user_player.id}
                                      all_pirates={ship.all_pirates}
                                      valid_ships={that.state.valid_ships}  />
                    );
                  })}
                  </div>
                </div>

              </div>

          </div>
        );
    }
});
