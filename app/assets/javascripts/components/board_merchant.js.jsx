var BoardMerchant = React.createClass ({
  getInitialState: function() {
     return {
       all_pirates:this.props.all_pirates,
       been_clicked: false,
       style: '',
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
      iconUrl: iconUrl
    })
  },

  eligibleClick: function() {
    if (this.state.been_clicked === false){
      this.setState({
        been_clicked: true
      });
      this.handleClick();
    }
  },

  handleClick: function(){
    var that = this;
    if (store.current_card !== 0){
      $.ajax({
              method: "POST",
              url: document.URL + "/players/" + this.props.player_id + "/play",
              data: {
                ship_id: this.props.ship_id,
                card_id: store.current_card
              },
              success: function(response){
                store.current_card = 0;
                that.setState({
                  been_clicked: false
                })
              }
            });
    }
  },
  handleMouseEnter: function(event){

      $(event.target).find(".hide-or-show").removeClass('hide-me');
  },
  handleMouseLeave: function(event){
      $(event.target).find(".hide-or-show").addClass('hide-me');

  },

  renderColor: function(whichColor) {
    var pirate = whichColor
    if (pirate.leader !== null) {
      return (
        <PirateCard leader={pirate.leader.user_name}
                    lead_portrait={pirate.leader.portrait}
                    sum={pirate.sum} />
      );
    } else {
      return (<span/>);
    }
  },
  render: function(){
    var that = this;
    console.log(this.state.all_pirates);
    return (
        <span>
          <div className="ship-card" onClick={this.eligibleClick}>
              <div>Leader: {this.props.leader_name} </div>
              <div>Lead Cannons: {this.props.lead_cannons} </div>
              <div className="ship-value"><img src={this.state.iconUrl} />
              <span>{this.props.value}</span></div>
              <img src={this.state.shipUrl} className="circle ship-image on-board" />

              <div className="attacker-ships">
                {this.renderColor(this.state.all_pirates.blue)}
                {this.renderColor(this.state.all_pirates.gold)}
                {this.renderColor(this.state.all_pirates.purple)}
                {this.renderColor(this.state.all_pirates.green)}

              </div>
          </div>
        </span>
      );

  }
});
