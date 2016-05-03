var GameShow = React.createClass ({
    getInitialState: function() {
       return {
         other_players: [],
         user_player: null,
         game: null
       };
     },
     tick: function() {
         var that = this;
         var url = document.URL;
         $.getJSON(url, function(response){
           console.log(response);
           that.setState({
             other_players: response.other_players,
             user_player: response.user_player,
             game: response.game
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
        return (
          <div>
              <div className="row">
              <div className="col player-list">

                {this.state.other_players.map(function(player){
                  return (
                      <ShowPlayer key={player.id}
                              name={player.user_name}
                              card_count={player.card_count}
                              score={player.score} />
                        );

                })}
              </div>

              </div>

              <div className='player-dash'>

              </div>
          </div>
        );
    }
});
