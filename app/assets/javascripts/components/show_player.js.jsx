var ShowPlayer = React.createClass ({
  render: function(){
    if (this.props.game_turn === this.props.player_id){
      return (
        <div className="card turn-indicator">
          <div className="card-content">

            <img className="circle portrait" src={this.props.portrait} />
            <div className="right">
            <strong className="player-name">{this.props.name} </strong>
            <div >Card Count: {this.props.card_count} </div>
            </div>
          </div>
        </div>
      );
    }else {
      return (
        <div className="card">
          <div className="card-content">
          <img className="circle portrait" src={this.props.portrait} />
            <div className="right">
            <strong className="player-name">{this.props.name} </strong>
            <p>Card Count: {this.props.card_count} </p>
            </div>
          </div>
        </div>
      );
    }
  }
});
