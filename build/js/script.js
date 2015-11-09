
$(function(){
  $('#griderly').griderly();

  $('.navigation-link').scrollToID({
    offset: 0
  });

  $("#navigation").stick_in_parent();
});
