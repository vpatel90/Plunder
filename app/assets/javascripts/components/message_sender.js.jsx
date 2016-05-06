var MessageSender = React.createClass ({
  getInitialState: function() {
    return {
      message: '',
    }
  },
  sendMessage: function() {
    var that = this;
    var url = '/games/' + this.props.game_id + '/new_message'
    $.ajax({
      method: "POST",
      url: url,
      data: {
        message: {
          body: this.state.message
        }
      }
    }).done(function(response){
      that.setState({
        message:''
      });
    });
  },
  handleDown: function(event) {
    if (event.keyCode === 13){
      this.sendMessage();
    }
  },
  handleChange: function(event) {
    this.setState({
      message: event.target.value
    });
  },

  render: function(){
      return (
        <span className='message-sender-form'>
          <input className='input-field' onKeyDown={this.handleDown}
                 onChange={this.handleChange}
                 type='text' placeholder='Hello World'
                 value={this.state.message}/>

          <input type='button' value='Send'
                 className='btn-flat send-button'
                 onClick={this.sendMessage} />
        </span>
      );
    }

});
