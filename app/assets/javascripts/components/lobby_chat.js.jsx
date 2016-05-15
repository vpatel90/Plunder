var LobbyChat = React.createClass ({
  getInitialState: function() {
     return {
       messages: []
     };
   },
   tick: function() {
       var that = this;
       var url = '/lobby/chat';
       var chatLog = document.getElementById("chat-log");
       var bottomScroll = chatLog.scrollHeight - chatLog.clientHeight <= chatLog.scrollTop + 5;
       $.getJSON(url, function(response){
         if (_.isEqual(_.last(response), _.last(that.state.messages)) === false ){
           //code to show new unread messages
         }
         that.setState({
           messages: response
         })
         if(bottomScroll)
            chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;
       });
   },
   componentDidMount: function() {
     this.tick();
     this.interval = setInterval(this.tick, 1000);
   },
   componentWillUnmount: function() {
     clearInterval(this.interval);
   },
  render: function(){
    return (
      <div className="lobby-chat" id="chat-log">
      {this.state.messages.map(function(message){
        return (
            <Notification key={message.id}
                  message={message}/>
            );
        })}
      </div>

    );
  }
});
