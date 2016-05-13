var UserDash = React.createClass ({
  getInitialState: function() {
     return {
       player: this.props.player,
       player_cards: [],
       total_cards: 0,
       game_turn: 0,
       messages: [],
       game_id: 0,
       active_id: 0
      //  captured_ships: []
     };
   },
   tick: function() {
       var that = this;
       var url = document.URL + '/players/' + this.state.player.id;
       var notificationLog = document.getElementById("notification-log");
       var bottomScroll = notificationLog.scrollHeight - notificationLog.clientHeight <= notificationLog.scrollTop + 5;
       $.getJSON(url, function(response){
         that.setState({
           player: response.player,
           player_cards: response.player_cards,
           total_cards: response.total_cards,
           game_turn: response.game.player_turn,
           messages: response.messages,
           game_id: response.game.id
          //  captured_ships: response.captured_ships
         })

         if(bottomScroll)
            notificationLog.scrollTop = notificationLog.scrollHeight - notificationLog.clientHeight;

       });

   },
   componentDidMount: function() {
     this.tick();
     this.interval = setInterval(this.tick, 1000);
   },
   componentWillUnmount: function() {
     clearInterval(this.interval);
   },
   cardActive: function(card_id) {
     if (this.state.active_id !== card_id) {
       this.setState({
         active_id: card_id
       })
     }
   },
  render: function(){
    var that = this;
    var chaturl = "/games/" + this.state.game_id + "/new_message"
    var n = 0
    return (
      <div>
        <div className="player-score"><img src="/assets/M-value.png" />
        <span>{this.state.player.score}</span></div>

        <div className="row container">
          <div className="col notifications hide-on-med-and-down" id="notification-log">
          {this.state.messages.map(function(message){
            n = n + 1;
            return (
                <Notification key={n}
                      message={message}/>
                );
            })}
          </div>
          <div className="col message-sender hide-on-med-and-down">
            <MessageSender url={chaturl}/>
          </div>
          <div className="col hand-cards">
          {this.state.player_cards.map(function(card){
            return (
                <Card key={card.id}
                      category={card.category}
                      color={card.color}
                      value={card.value}
                      player_id={that.state.player.id}
                      game_turn={that.state.game_turn}
                      card_id={card.id}
                      active_id={that.state.active_id}
                      cardActive={that.cardActive}
                      />
                );
            })}
          </div>
          <div className="col center game-deck">
                  <DrawCard player_id={this.state.player.id}
                            game_turn={this.state.game_turn}
                            total_cards={this.state.total_cards}
                            active_id={this.state.active_id}
                            cardActive={that.cardActive}
                            
                            />
          </div>
        </div>
      </div>
    );
  }
});
