var GameOver = React.createClass ({
  render: function(){
    var that = this;
    if (this.props.game === null || this.props.game.state === "STARTED"){
      return (
        <span />
      );
    }else if (this.props.game.state === "ENDING" || this.props.game.state === "ENDED"){
      return (
        <div className="card game-over-card" onClick={this.handleClick}>
          <div className="card-content">
            <h2> This Game is Over </h2>
            <div className="winner-list">
            {that.props.players.map(function(player){
              return (

                <div className="col">
                <ShowPlayer key={player.id}
                            winner={player.winner}
                            portrait={player.portrait}
                            name={player.user_name}
                            score={player.score}
                            game_end={true}/>
                </div>
              );
            })}
            </div>
            <br />
            <h4><a href="/">Join Another Game </a></h4>
          </div>
        </div>
      );
    }
  }

});
