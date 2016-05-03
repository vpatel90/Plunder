var Card = React.createClass ({
  handleClick: function() {
      $.ajax({
              method: "POST",
              url: document.URL + "/players/" + this.props.player_id + "/play_merc",
              data: {
                card_id: this.props.card_id
              }
            });
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
