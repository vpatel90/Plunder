var Card = React.createClass ({
  render: function(){
    var that = this;


    return (
      <div className="card play-card">
        <div className="card-content">
          <div>Category: {this.props.category}</div>
          <div>Color: {this.props.color}</div>
          <div>Value: {this.props.value}</div>
        </div>
      </div>
    );
  }

});
