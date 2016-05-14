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
      iconUrl: iconUrl,
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
              },
              error: function(response){
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

  renderColor: function(whichColor, color) {
    var pirate = whichColor
    if (pirate.leader !== null) {
      return (
        <PirateCard leader={pirate.leader.user_name}
                    lead_portrait={pirate.leader.portrait}
                    sum={pirate.sum}
                    color={color} />
      );
    } else {
      return (<span/>);
    }
  },
  render: function(){
    var that = this;
    var glow = "circle ship-image on-board";
    var pointer = "hide-me";
    if (_.some(this.props.valid_ships, function(i){ return i === that.props.ship_id})){
      glow = "circle ship-image on-board";
      pointer = "pointer";
    }
    return (
          <div className="ship-card" onClick={this.eligibleClick}>
              <img className="circle portrait" src={this.props.leader_portrait} />

              <div className="ship-value"><img src={this.state.iconUrl} />
              <span>{this.props.value}</span></div>
              <span className={pointer}><i className="material-icons">arrow_forward</i></span>
              <img className={glow} src={this.state.shipUrl} />

              <div className="attacker-ships">
                {this.renderColor(this.props.all_pirates.blue, 'blue')}
                {this.renderColor(this.props.all_pirates.gold, 'gold')}
                {this.renderColor(this.props.all_pirates.purple, 'purple')}
                {this.renderColor(this.props.all_pirates.green, 'green')}

              </div>
          </div>
      );

  }
});
