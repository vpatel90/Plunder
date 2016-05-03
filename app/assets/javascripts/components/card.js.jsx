var Card = React.createClass ({
  handleClick: function() {
    if (this.props.category === "M"){
      $.ajax({
              method: "POST",
              url: document.URL + "/players/" + this.props.player_id + "/play",
              data: {
                card_id: this.props.card_id,
                ship_id: 0
              }
            });
    }else {
      store.current_card = this.props.card_id
    }
  },
  render: function(){
    var that = this;
    return (
      <div className="card play-card" onClick={this.handleClick}>
        <div className="card-content">
          <div>Category: {this.props.category}</div>
          <div>Color: {this.props.color}</div>
          <div>Value: {this.props.value}</div>
        </div>
      </div>
    );
  }

});
