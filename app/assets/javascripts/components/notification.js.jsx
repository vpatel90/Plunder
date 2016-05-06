var Notification = React.createClass ({

  render: function(){
      if(this.props.message.user !== undefined){
        return (
          <p className="sm-margin">
            {this.props.message.user.name}: {this.props.message.body}
            </p>
        );
      }else {
        return (
          <p className="sm-margin">
            {this.props.message.body}
          </p>
        );
      }
    }

});
