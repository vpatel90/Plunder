var TurnAnnouncer = React.createClass ({

  render: function(){
    if (this.props.player === null || this.props.player.id !== this.props.game.player_turn) {
      return (
        <h5>
        </h5>
      );
    }else if(this.props.player.id === this.props.game.player_turn){
      return (
        <h5 className="center">
          Its Your Turn
        </h5>
      );
    }
  }
});
