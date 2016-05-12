var JoinLeave = React.createClass({
  getInitialState: function() {
    return {
    }
  },
  handleLeave: function(event) {
    this.sendAjax('/leave');
    window.location.replace("/");
  },
  handleJoin: function(event) {
    this.sendAjax('/join');
  },
  handleStart: function(event) {
      this.sendAjax('/start');


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
          <a className="leave-ready-link override" href="#" onClick={this.handleStart}>
              Ready
          </a>
          <a className="leave-ready-link override" href="#" onClick={this.handleLeave}>
              Leave
          </a>

        </div>
      );
    }else if (this.props.user_game === null && this.props.player_count !== this.props.num_players) {
      return (
        <div className="leave-ready-btns ">
            <a className="leave-ready-link override" href="#" onClick={this.handleJoin}>
            Join
            </a>
        </div>
      );
    } else {
      return (
        <div />
      );
    }

  }
});
