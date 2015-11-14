var introMap = function(){
  var waypoint = new Waypoint({
    element: document.getElementById('intro'),
    handler: function(direction) {
      $('#svg-map').addClass('map-active');

      setTimeout(function(){
        mapIncrement(trailsMax);
      },50);


    },
    offset: '10%'
  });
};


var winWidth;


var stickyNav = function(){
  var $navigationLink = $('#navigation').find('.navigation-link');

  //waypoints to trigger the  and the navigation higlighting. 
  $('.navigation-section').waypoint({
    handler: function() {
      var theElement = this.element,
      id = theElement.id;

      $navigationLink.removeClass('active');
      $('#navigation-link-' + id).addClass('active');



      
    },
    offset: 0
  });




  $("#navigation").stick_in_parent();
};

var $mapCounter = $('#map-counter'),
currentCount = $mapCounter.text(),
trailsMax = 86,
trailsMin = 16,
t; //store the time out. 

var mapIncrement = function(count) {
  clearTimeout(t);
  if(count === trailsMax) {
    //count up
    if(currentCount < trailsMax) {
      currentCount++;
      t = setTimeout(function(){mapIncrement(count);},25);

    }
    
  }
  else {
    //count down  

    if(currentCount > trailsMin) {
      currentCount--;
      t = setTimeout(function(){mapIncrement(count);},25);

    }
  }
  $mapCounter.text(currentCount);
  
}

var toggleMaps = function(){
  var $mapToggleLink = $('#map-toggle .map-toggle-link'),
  $mapToggleBg = $('#map-toggle-bg'),
  $svgMap = $('#svg-map');


  $mapToggleLink.on('click',function(e){
    e.preventDefault();
    
    if($mapToggleLink.index(this) === 1) {
      $mapToggleBg.width($(this).outerWidth());
      $svgMap.addClass('trails-closed').removeClass('trails-open');
      mapIncrement(trailsMin);
    }
    else {
      $mapToggleBg.removeAttr('style');
      $svgMap.addClass('trails-open').removeClass('trails-closed');
      mapIncrement(trailsMax);
    }
    $(this).addClass('active').siblings('.map-toggle-link').removeClass('active');
  });
}


var routesAccordion = function(){
  $('.route-header').on('click',function(){
    if($(window).width() < 480) {
      $(this).toggleClass('active').next('.route-contents').slideToggle(300);
    }
  });
};


$(function(){

  $('#griderly').griderly();

  $('.navigation-link').scrollToID({
    offset: 0
  });

  introMap();
  toggleMaps();
  stickyNav();
  routesAccordion();
  
});
