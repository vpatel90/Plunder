var DrawCard = React.createClass ({
  render: function(){
    if (this.props.player_id === this.props.game_turn) {
      return (
        <div className="card play-card">
          <div className="card-content">
            <div>Draw Card</div>
          </div>
        </div>
      );
    }else {
      return (
        <div className="card play-card-deck">
          <div className="card-content">
          </div>
        </div>
      )
    }
  }
});
