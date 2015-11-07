/*
$.griderly();
 
*/

(function ($) {
  $.fn.griderly = function (args) {
    var options = {
      speed:        500, 
      offset:       20,
      images: [],
    };

    var $griderlyOverlay = null;


    var generateGriderlyTemplate = function($el){
      $('#griderly-overlay').remove();
      $griderlyOverlay = $('<div id="griderly-overlay" class="griderly-overlay loading"></div>');
      
      $griderlyOverlay.append(
          '<div class="griderly-close"></div>' + 
          '<div class="griderly-container">' + 
            '<div class="griderly-item"></div>' + 
            '<div class="griderly-item"></div>' + 
            '<div class="griderly-item"></div>' + 
          '</div>');

      $el.append($griderlyOverlay);

      $griderlyOverlay.addClass('active');
    };
   
    $.extend( options, args );

    console.log('griderly');
    
    this.each(function(){
      $parent = $(this);
      var $galleryThumbs = $(this).find('.gallery-thumb-link');
      if(options.images.length === 0) {
        $galleryThumbs.each(function(){
          options.images.push($(this).attr('href'));
        });
      }
      console.log(options.images);
      $galleryThumbs.on('click',function(e){
          generateGriderlyTemplate($parent);
          e.preventDefault();

      var url       = $(this).attr('href');
      console.log('url: ' + url);
         

      });

    });

    return this;

  };
}( jQuery ));

