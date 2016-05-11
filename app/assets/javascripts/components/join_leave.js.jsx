var JoinLeave = React.createClass({
  getInitialState: function() {
    return {
      ready: false
    }
  },
  handleLeave: function(event) {
    this.sendAjax('/leave');
  },
  handleJoin: function(event) {
    this.sendAjax('/join');
  },
  handleStart: function(event) {
    if (this.state.ready === false) {
      this.sendAjax('/start');
      event.target.className += ' disabled';
      this.setState({
        ready: true
      })
    }
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
        <div className="btn-flat sub-btn" onClick={this.handleStart}>
            Ready
        </div><br/>
        <div className="btn-flat sub-btn" onClick={this.handleLeave}>
            Leave
        </div>

        </div>
      );
    }else if (this.props.user_game === null && this.props.player_count !== this.props.num_players) {
      return (
        <div className="leave-ready-btns">
            <div className="btn-flat right" onClick={this.handleJoin}>
            Join
            </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }

  }
});
