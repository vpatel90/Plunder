var BoardMerchant = React.createClass ({
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
  render: function(){
      return (
        <div className="card ship-card" onClick={this.handleClick}>
          <div className="card-content">
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
