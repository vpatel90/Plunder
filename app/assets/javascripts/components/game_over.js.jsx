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
            {that.props.game.winners.map(function(player){
              return (
                <span>
                <div> Winner: {player.user_name} </div>
                <div> Score: {player.score} </div>
                </span>
              );
            })}
            <h4><a href="/">Join Another Game </a></h4>
          </div>
        </div>
      );
    }
  }

});
