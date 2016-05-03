var UserDash = React.createClass ({
  getInitialState: function() {
     return {
       player: this.props.player,
       player_cards: [],
      //  captured_ships: []
     };
   },
   tick: function() {

       var that = this;
       var url = document.URL + '/players/' + this.state.player.id;
       $.getJSON(url, function(response){
         console.log(response);
         that.setState({
           player_cards: response.player_cards,
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
      <div className="row">
        {this.state.player_cards.map(function(card){
          return (
              <Card key={card.id}
                    category={card.category}
                    color={card.color}
                    value={card.value}/>
              );
          })}
        </div>
    );
  }
});
