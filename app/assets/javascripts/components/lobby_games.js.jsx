var LobbyGames = React.createClass({
  getInitialState: function() {
     return {
       games: []
     };
   },
   tick: function() {
     var that = this;
     var url = '/games';
     $.getJSON(url, function(response){
       that.setState({
         games: response
       })
     });
   },
   componentDidMount: function() {
     this.tick();
     this.interval = setInterval(this.tick, 10000);
   },
   componentWillUnmount: function() {
     clearInterval(this.interval);
   },
  render: function(){
    return (
      <div>
        {this.state.games.map(function(game){
                  return (
                    <div key={game.id}>
                        {game.name}: {game.player_count}/{game.num_players}
                    </div>
                  );
              })}
      </div>
    );
  }
});
