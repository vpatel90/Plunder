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
          <div className="card styled-pirate-card">
            <span className="">
                <small>{this.props.sum} </small><br/>
                <small>{this.props.leader}</small>
            </span>
          </div>
        );
      
    }

});
