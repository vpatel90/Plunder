var MessageSender = React.createClass ({
  getInitialState: function() {
    return {
      message: '',
    }
  },
  sendMessage: function() {
    var that = this;
    $.ajax({
      method: "POST",
      url: this.props.url,
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
      if (this.props.user !== null){
        return (
          <span className='message-sender-form'>
            <div className='text-input-field'>
            <input className='input-field' onKeyDown={this.handleDown}
                   onChange={this.handleChange}
                   type='text' placeholder='Hello World'
                   value={this.state.message}/>
                   </div>

            <input type='button' value='Send'
                   className='btn-flat send-button'
                   onClick={this.sendMessage} />
          </span>
        );
      }else{
          return (
            <span className='message-sender-form'>
              <div className='text-input-field'>
              <input disabled='disabled' className='input-field disabled'

                     type='text' placeholder='Please Register or Login'
                     />
                     </div>

              <input type='button' value='Send'
                     className='disabled btn-flat send-button'
                      />
            </span>

              );
            }
    }

});
