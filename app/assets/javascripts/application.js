// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require materialize-sprockets
//= require materialize/extras/nouislider
//= require underscore
//= require react
//= require react_ujs
//= require components

var store = {
  current_card: 0,
  last_notification: 0
};

var ready;
ready = function() {

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );

  $('.tooltipped').tooltip({delay: 50});

  $('select').material_select();

  $(".close-modal").on("click",function(){
    $('#create_modal').closeModal();
    $('#login_modal').closeModal();
    $('#signup_modal').closeModal();
    $('#help_modal').closeModal();


  });

  $("#login, #login-mobile").on("click",function(){
    $('#login_modal').openModal();
  });

  $("#signup, #signup-mobile").on("click",function(){
    $('#signup_modal').openModal();
  });

  $("#create_game").on("click",function(){
    $('#create_modal').openModal();
  });

  $(".help-modal-trigger").on("click",function(){
    $('#help_modal').openModal();
  });


  var mainNav = $("#main-nav");
  mainNav.on("click",function(){
    mainNav.addClass("drop-nav");
    setTimeout(function(){
      mainNav.removeClass("drop-nav");
      },
      3000);
  });

  var miniMax = $(".mini-max")
  $("#mini-max").on("click",function(){
    var chatBox = $(".inner-chat-box")
    chatBox.toggleClass("hide-me");
    if (chatBox.hasClass("hide-me")) {
      miniMax.html("+");
    }else {
      miniMax.html("-");
    }
  });

};

$(document).ready(ready);
$(document).on('page:load', ready);


//= require_tree .
