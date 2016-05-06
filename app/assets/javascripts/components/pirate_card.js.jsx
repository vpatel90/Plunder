var PirateCard = React.createClass ({

  render: function(){

      return (
        <div className="card styled-pirate-card">
          <span className="">
              <small>{this.props.owner_name} </small><br/>
              <small>v: {this.props.value}</small>
          </span>
        </div>
      );
    }

});
