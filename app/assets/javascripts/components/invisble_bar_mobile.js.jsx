var InvisibleBarMobile = React.createClass ({
  handleTouch: function(){
    $("main-nav").css('top', '0');
  },
  render: function(){
      return (
        <div className="invisible-nav hide-on-large-only" onTouchStart={this.handleTouch}>
        </div>
      );
    }
});
