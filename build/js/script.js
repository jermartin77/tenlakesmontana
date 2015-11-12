$(function(){
  var introMap = function(){
    var waypoint = new Waypoint({
      element: document.getElementById('intro-map'),
      handler: function(direction) {
        $('#svg-map').addClass('map-active');

        setTimeout(function(){
          mapIncrement(trailsMax);
        },50);


      }
    })
  };

  var $mapCounter = $('#map-counter'),
  currentCount = $mapCounter.text(),
  trailsMax = 86,
  trailsMin = 16;

  var mapIncrement = function(count) {
    if(currentCount <= trailsMax && count === trailsMax) {
      currentCount++;
     
    }
    else if (currentCount => trailsMin){
      currentCount--;
      
   }
   $mapCounter.text(currentCount);
   setTimeout(function(){mapIncrement(count);},50);
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




$('#griderly').griderly();

$('.navigation-link').scrollToID({
  offset: 0
});

introMap();
toggleMaps();

$("#navigation").stick_in_parent();
});
