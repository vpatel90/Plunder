var JoinLeave = React.createClass({
  handleLeave: function() {
    $.ajax({
            method: "POST",
            url: "/games/" + this.props.game + "/leave",
            success: this.tick
          });
  },
  handleJoin: function() {
    $.ajax({
            method: "POST",
            url: "/games/" + this.props.game + "/join",
            success: this.tick
          });
  },
  handleStart: function() {
    $.ajax({
            method: "POST",
            url: "/games/" + this.props.game + "/start",
            success: this.tick
          });
  },
  tick: function(){
    this.props.tick();
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
