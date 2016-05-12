var Notification = React.createClass ({

  render: function(){
      if(this.props.message.user !== undefined){
        return (
          <div className="sm-margin">
            <div className="larger-font">{this.props.message.user.name}</div>
            <div className="user-message">{this.props.message.body}</div>
            </div>
        );
      }else {
        return (
          <div className="sm-margin notification-decoration">
            {this.props.message.body}
          </div>
        );
      }
    }

});
