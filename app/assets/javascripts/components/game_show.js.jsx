var GameShow = React.createClass ({
    getInitialState: function() {
       return {
         players: [],
         user_player: null,
         game: null
       };
     },
     tick: function() {
         var that = this;
         var url = document.URL;
         $.getJSON(url, function(response){
           that.setState({
             players: response.players,
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
          <div className="row">
            {this.state.players.map(function(player){
              return (
                  <ShowPlayer key={player.id}
                          name={player.user_name}
                          card_count={player.card_count}
                          score={player.score} />
                    );

            })}


          </div>
        );
    }
});
