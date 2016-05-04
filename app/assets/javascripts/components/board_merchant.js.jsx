var BoardMerchant = React.createClass ({
  getInitialState: function() {
     return {
       pirates:[]
     };
   },
  handleClick: function(){
    if (store.current_card !== 0){
      $.ajax({
              method: "POST",
              url: document.URL + "/players/" + this.props.player_id + "/play",
              data: {
                ship_id: this.props.ship_id,
                card_id: store.current_card
              }
            });
    }
  },
  handleMouseEnter: function(event){
    var that = this;
    var url = document.URL + '/merchants/' + this.props.ship_id
    $.getJSON(url, function(response){
      that.setState({
        pirates: response.pirates
      })
    });
  },
  handleMouseLeave: function(event){
      this.setState({
        pirates: []
      })
  },
  render: function(){
      return (
        <div className="card ship-card" onClick={this.handleClick}>
          <div className="card-content" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <div>Leader: {this.props.leader_name} </div>
            <div>Lead Cannons: {this.props.lead_cannons} </div>
            <div>Category: {this.props.category}</div>
            <div>Color: {this.props.color}</div>
            <div>Value: {this.props.value}</div>
          </div>
        </div>
      );

  }
});
