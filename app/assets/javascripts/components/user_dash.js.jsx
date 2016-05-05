var UserDash = React.createClass ({
  getInitialState: function() {
     return {
       player: this.props.player,
       player_cards: [],
       total_cards: 0,
       game_turn: null,
      //  captured_ships: []
     };
   },
   tick: function() {

       var that = this;
       var url = document.URL + '/players/' + this.state.player.id;
       $.getJSON(url, function(response){
         that.setState({
           player: response.player,
           player_cards: response.player_cards,
           total_cards: response.total_cards,
           game_turn: response.game.player_turn,
          //  captured_ships: response.captured_ships
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
        <div className="row center">
          Total Gold:{this.state.player.score}
        </div>
        <div className="row container">
          <div className="col hand-cards">
          {this.state.player_cards.map(function(card){
            return (
                <Card key={card.id}
                      category={card.category}
                      color={card.color}
                      value={card.value}
                      player_id={that.state.player.id}
                      game_turn={that.state.game_turn}
                      card_id={card.id}/>
                );
            })}
          </div>
          <div className="col center game-deck">
                  <DrawCard player_id={this.state.player.id}
                            game_turn={this.state.game_turn}
                            total_cards={this.state.total_cards}
                            />
          </div>
        </div>
      </div>
    );
  }
});
