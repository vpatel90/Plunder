var DrawCard = React.createClass ({
  handleClick: function(){
    $.ajax({
            method: "POST",
            url: document.URL + "/players/" + this.props.player_id + "/draw",
          });
  },
  render: function(){
    if (this.props.player_id === this.props.game_turn) {
      return (
        <div className="card play-card" onClick={this.handleClick}>
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
