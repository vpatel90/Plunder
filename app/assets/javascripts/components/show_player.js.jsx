var ShowPlayer = React.createClass ({
  render: function(){
    return (
      <div className="card">
        <div className="card-content">
          <p>Name: {this.props.name} </p>
          <p>Card Count: {this.props.card_count} </p>
          <p>Score: {this.props.score} </p>
        </div>
      </div>
    );
  }
});
