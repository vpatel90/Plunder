var ShowPlayer = React.createClass ({
  render: function(){
    if (this.props.game_turn === this.props.player_id){
      return (
        <div className="card">
          <div className="card-content">
            <span className="right"> Their Turn </span>
            <p>Name: {this.props.name} </p>
            <p>Card Count: {this.props.card_count} </p>
            <p>Score: {this.props.score} </p>
          </div>
        </div>
      );
    }else {
      return (
        <div className="card">
          <div className="card-content">
            <p>Name: {this.props.name} </p>
            <p>Card Count: {this.props.card_count} </p>
            <p>Score: {this.props.score} </p>
          </div>
        </div>
      );
    }
  }
});
