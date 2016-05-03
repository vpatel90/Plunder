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
        <span>
        <span className="btn-flat" onClick={this.handleLeave}>
            Leave
        </span>
        <span className="btn-flat" onClick={this.handleStart}>
            Start
        </span>
        </span>
      );
    }else if (this.props.user_game === null) {
      return (
        <span className="btn-flat" onClick={this.handleJoin}>
            Join
        </span>
      );
    } else {
      return (
        <span />
      );
    }

  }
});
