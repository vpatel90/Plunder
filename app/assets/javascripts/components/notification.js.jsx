var Notification = React.createClass ({

  render: function(){
      if(this.props.message.user !== undefined){
        return (
          <p className="sm-margin">
            <span className="larger-font">{this.props.message.user.name}</span>: {this.props.message.body}
            </p>
        );
      }else {
        return (
          <p className="sm-margin notification-decoration">
            {this.props.message.body}
          </p>
        );
      }
    }

});
