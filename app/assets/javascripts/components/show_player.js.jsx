var ShowPlayer = React.createClass ({
  render: function(){
    if (this.props.game_turn === this.props.player_id){
      return (
        <div className="card">
          <div className="card-content">

            <img className="circle portrait turn-indicator" src={this.props.portrait} />
            <span className="right"> Their Turn </span>
            <div >{this.props.name} </div>
            <div >Card Count: {this.props.card_count} </div>
          </div>
        </div>
      );
    }else {
      return (
        <div className="card">
          <div className="card-content">
          <img className="circle portrait" src={this.props.portrait} />
            <p>Name: {this.props.name} </p>
            <p>Card Count: {this.props.card_count} </p>
          </div>
        </div>
      );
    }
  }
});
