var TurnAnnouncer = React.createClass ({
  handleClick: function(){
    $.ajax({
            method: "POST",
            url: document.URL + "/players/" + this.props.player.id + "/skip",
          });
  },

  render: function(){
    if (this.props.player === null || this.props.player.id !== this.props.game.player_turn) {
      return (
        <h5>
        </h5>
      );
    }else if(this.props.player.valid_moves === false){
      return (
        <div className="card game-over-card" onClick={this.handleClick}>
          <div className="card-content">
            <h5 className="center">
              Its Your Turn, But You have no valid moves
              <small onClick={this.handleClick}> Pass Turn </small>
            </h5>
          </div>
        </div>
      );
    }else if(this.props.player.booted === true){
      return (
        <h5 className="center">

        </h5>
      );
    }else {
      var rT = (this.props.turn_start + 90) - ((new Date().getTime())/1000);


      var remainingTime = Math.floor(rT);
      return (
        <h5 className="center">
          Its Your Turn <Timer secondsRemaining={remainingTime}/>
        </h5>
      );
    }
  }
});
