var Card = React.createClass ({
  getInitialState: function() {
     return {
       style: '',
       clickedStyle: '',
       shipUrl: '',
       iconUrl: '',
     };
   },
   componentWillMount: function() {
     var style = "card play-card color-card-" + this.props.color;
     var shipUrl = "/assets/" + this.props.category + ".png";
     var iconUrl = "/assets/" + this.props.category + "-value.png";


     this.setState({
       style: style,
       shipUrl: shipUrl,
       iconUrl: iconUrl,
     })
   },

  handleClick: function() {
    if (this.props.game_turn == this.props.player_id){
      this.props.cardActive(this.props.card_id);
    }
  },

  handleConfirm: function() {
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
    var clickedStyle = '';
    var hideConfirm = 'right';
    if (this.props.card_id === this.props.active_id){
      clickedStyle = 'clicked-card';
      hideConfirm = 'btn-flat play-confirm right';
    } else {
      clickedStyle = '';
      hideConfirm = 'right hide-me';

    }
    return (
      <span className={clickedStyle}>
      <div className={this.state.style} onClick={this.handleClick}>
        <div className="card-content">
          <span onClick={this.handleConfirm} className={hideConfirm}>Play Card</span>
          <div className="ship-value"><img src={this.state.iconUrl} />
          <span>{this.props.value}</span></div>
          <img src={this.state.shipUrl} className="ship-image" />

        </div>
      </div>
      </span>
    );
  }

});
