var ShowPlayer = React.createClass ({

  renderProp:function(){
    if (this.props.game_end === true){
      return (<div>Gold: {this.props.score} </div>);
    }else {
      return (<p>Card Count: {this.props.card_count} </p>);
    }
  },
  render: function(){
    var stylePlayer = 'card-parent';
    if (this.props.user_id === this.props.player_id){
      stylePlayer = 'card-parent this-player'
    }
    var turnIndicator = 'card'
    if (this.props.game_turn === this.props.player_id){
      turnIndicator = 'card turn-indicator'
    }

    if (this.props.game_end === true){
      turnIndicator = "card"
      if (this.props.winner) {
        turnIndicator = "card turn-indicator";
      }
    }
      return (
        <div className={stylePlayer}>
        <div className={turnIndicator}>
          <div className="card-content">

            <img className="circle portrait" src={this.props.portrait} />
            <div className="right">
            <strong className="player-name">{this.props.name} </strong>
            {this.renderProp()}
            </div>
          </div>
        </div>
        </div>
      );
    }
  
});
