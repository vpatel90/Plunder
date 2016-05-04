var BoardMerchant = React.createClass ({
  getInitialState: function() {
     return {
       blue_pirates:this.props.blue_pirates,
       green_pirates:this.props.green_pirates,
       purple_pirates:this.props.purple_pirates,
       gold_pirates:this.props.gold_pirates,

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
      console.log(event.target);

      $(event.target).find(".hide-or-show").removeClass('hide-me');
  },
  handleMouseLeave: function(event){
      $(event.target).find(".hide-or-show").addClass('hide-me');

  },
  render: function(){
    var that = this;
    var cName = function(){

    };
    return (
        <span>
          <div className="card ship-card" onClick={this.handleClick} onMouseLeave={this.handleMouseLeave}>
            <div className="card-content" id="test" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
              <span className="blue-pirate-card hide-or-show hide-me">
                {this.state.blue_pirates.map(function(ship){
                  return (

                      <PirateCard key={ship.id}
                                    color={ship.color}
                                    value={ship.value}
                                    ship_id={ship.id}
                                    owner_name={ship.owner_name}
                                    />

                  );

                })}
                </span>
                <span className="gold-pirate-card hide-or-show hide-me">
                  {this.state.gold_pirates.map(function(ship){
                    return (
                        <div key={ship.id}>
                        <PirateCard key={ship.id}
                                      color={ship.color}
                                      value={ship.value}
                                      ship_id={ship.id}
                                      owner_name={ship.owner_name}
                                      />
                                      </div>
                    );

                  })}
                  </span>
                  <span className="purple-pirate-card hide-or-show hide-me">
                    {this.state.purple_pirates.map(function(ship){
                      return (

                          <PirateCard key={ship.id}
                                        color={ship.color}
                                        value={ship.value}
                                        ship_id={ship.id}
                                        owner_name={ship.owner_name}
                                        />

                      );

                    })}
                    </span>
                    <span className="green-pirate-card hide-or-show hide-me">
                      {this.state.green_pirates.map(function(ship){
                        return (
                            <div key={ship.id}>
                            <PirateCard key={ship.id}
                                          color={ship.color}
                                          value={ship.value}
                                          ship_id={ship.id}
                                          owner_name={ship.owner_name}
                                          />
                                          </div>
                        );

                      })}
                      </span>
              <div>Leader: {this.props.leader_name} </div>
              <div>Lead Cannons: {this.props.lead_cannons} </div>
              <div>Category: {this.props.category}</div>
              <div>Color: {this.props.color}</div>
              <div>Value: {this.props.value}</div>
            </div>
          </div>
        </span>
      );

  }
});
