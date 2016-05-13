var Timer = React.createClass ({
  getInitialState: function() {
    return {
      secondsRemaining: 0
    };
  },
  tick: function() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  },
  componentWillMount: function() {
    this.setState({ secondsRemaining: this.props.secondsRemaining });
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function(){
      var className = 'timer';
      if (this.state.secondsRemaining < 11 || this.state.secondsRemaining % 10 === 0){
        className = 'timer bounce'
      }
      return (
        <div className={className}>
            {this.state.secondsRemaining}
        </div>
      );
    }
});
