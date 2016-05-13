var DrawCard = React.createClass ({
  handleClick: function(){
    this.props.cardActive(0);
    $.ajax({
            method: "POST",
            url: document.URL + "/players/" + this.props.player_id + "/draw",
          });
  },
  render: function(){
    if (this.props.player_id === this.props.game_turn) {
      return (
          <div className="card-content">
            <div className='btn primary-color' onClick={this.handleClick}>Draw Card({this.props.total_cards})</div>
        </div>
      );
    }else {
      return (
          <div className="card-content">
            <div className='btn disabled'>Draw Card {this.props.total_cards}</div>

          </div>
      )
    }
  }
});
