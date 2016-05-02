var JoinLeave = React.createClass({
  handleLeave: function() {
    $.ajax({
            method: "POST",
            url: "/games/" + this.props.game + "/leave",
            success: this.props.tick(),
          });
  },
  handleJoin: function() {
    $.ajax({
            method: "POST",
            url: "/games/" + this.props.game + "/join",
            success: this.props.tick(),
          });
  },
  render: function(){
    var that = this;
    if (this.props.user_game === this.props.game) {
      return (
        <span className="btn-flat" onClick={this.handleLeave}>
            Leave
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
