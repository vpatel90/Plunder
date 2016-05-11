var JoinLeave = React.createClass({
  handleLeave: function() {
    this.sendAjax('/leave')
  },
  handleJoin: function() {
    this.sendAjax('/join')
  },
  handleStart: function() {
    this.sendAjax('/start')
  },
  sendAjax: function(route){
    $.ajax({
            method: "POST",
            url: "/games/" + this.props.game + route,
            success: this.props.tick()
          });

  },
  render: function(){
    var that = this;
    if (this.props.user_game === this.props.game) {
      return (
        <div className="leave-ready-btns">
        <div className="btn-flat sub-btn" onClick={this.handleLeave}>
            Leave
        </div><br/>
        <div className="btn-flat sub-btn" onClick={this.handleStart}>
            Ready
        </div>
        </div>
      );
    }else if (this.props.user_game === null && this.props.player_count !== this.props.num_players) {
      return (
        <div className="btn-flat right" onClick={this.handleJoin}>
            Join

        </div>
      );
    } else {
      return (
        <div />
      );
    }

  }
});
