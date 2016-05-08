var PirateCard = React.createClass ({

  getInitialState: function() {
     return {
       shipUrl: '',
       iconUrl: ''
     };
   },

  componentWillMount: function() {
    var shipUrl = "/assets/P.png";
    var iconUrl = "/assets/P-value.png";
    this.setState({
      shipUrl: shipUrl,
      iconUrl: iconUrl
    })
  },

  render: function(){

        return (
          <div className="pirate-card styled-pirate-card">
              <div className="pirate-ship-value"><img src={this.state.iconUrl} />
                <span>{this.props.sum} </span></div>
                <img src={this.state.shipUrl} className="circle ship-image pirate-on-board" />
                <div><img className="circle portrait-on-board" src={this.props.lead_portrait} /> </div>
          </div>
        );

    }

});
