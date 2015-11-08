/*
$.griderly();
 
*/

(function ($) {
  $.fn.griderly = function (args) {
    var options = {
      speed:        410, 
      offset:       20,
      images: [],

    };

    var $griderlyOverlay = null;


    var generateGriderlyTemplate = function($el){
      $('#griderly-overlay').remove();
      $griderlyOverlay = $('<div id="griderly-overlay" class="griderly-overlay loading"></div>');
      
      $griderlyOverlay.append(
        '<div class="griderly-close"></div>' + 
        '<div class="griderly-arrow griderly-arrow-previous" data-dir="previous"></div>' + 
        '<div class="griderly-arrow griderly-arrow-next" data-dir="next"></div>' + 
        '<div class="griderly-container">' + 
        '<div class="griderly-wrapper">' + 
        '<div class="griderly-item"></div>' + 
        '<div class="griderly-item"></div>' + 
        '<div class="griderly-item"></div>' + 
        '</div>' + 
        '</div>');

      $el.append($griderlyOverlay);
      setTimeout(function( ){
        $griderlyOverlay.addClass('active');
      },50);
    };

    $.extend( options, args );

    
    this.each(function(){
      var $parent = $(this),
      currentIndex,
      currentImage,
      prevImage,
      nextImage,
      $griderlyItem,
      $wrapper;


      var setBgImage = function(idx){
        prevImage = options.images[idx - 1];
        currentImage = options.images[idx];
        nextImage = options.images[idx + 1];


        if(idx === options.images.length - 1) {
          //we're at the last one gotta loop it. 
          nextImage = options.images[0];
        }

        if(idx === 0) {
          //we're at the first one gotta loop it. 
          prevImage = options.images[(options.images.length - 1)];
        }

        console.log('index is ' + idx);
        console.log('prevImage is ' + prevImage);
        console.log('currentImage is ' + currentImage);
        console.log('nextImage is ' + nextImage);


        $griderlyItem.eq(0).css({
          'background-image': 'url(' + prevImage + ')'
        });
        $griderlyItem.eq(1).css({
          'background-image': 'url(' + currentImage + ')'
        });
        $griderlyItem.eq(2).css({
          'background-image': 'url(' + nextImage + ')'
        });
      };

      //bind the close button
      $parent.on('click','.griderly-close',function(){
        $griderlyOverlay.removeClass('active');
        setTimeout(function(){
          $griderlyOverlay.remove();
        },500)
      });


      //bind the prev/next buttons
      $parent.on('click','.griderly-arrow',function(){
        var $this = $(this),
        dir = $this.data('dir');





        if(dir === 'previous') {
          if(currentIndex === 0) {
            currentIndex = options.images.length - 1;
          }
          else {
            currentIndex = currentIndex - 1;
          }
          
        }
        else {
          if(currentIndex === options.images.length - 1) {
            currentIndex = 0;
          } else {
            currentIndex = currentIndex + 1;
          }
        }

        $wrapper.addClass(dir + ' animate');
        setTimeout(function(){
         setBgImage(currentIndex);

         $wrapper.removeClass(dir + ' animate');
       },options.speed);



      });


      //Add all images to an array
      var $galleryThumbs = $(this).find('.gallery-thumb-link');
      if(options.images.length === 0) {
        $galleryThumbs.each(function(){
          options.images.push($(this).attr('href'));
        });
      }

      //bind the click
      $galleryThumbs.on('click',function(e){
        generateGriderlyTemplate($parent);
        e.preventDefault();

        currentIndex = $('.gallery-thumb-link').index(this);
        $griderlyItem = $griderlyOverlay.find('.griderly-item');
        $wrapper = $griderlyOverlay.find('.griderly-wrapper');



        currentImage = options.images[currentIndex];
        nextImage = options.images[currentIndex + 1];
        prevImage = options.images[currentIndex - 1];


        console.log('currentIndex is: ' + currentIndex);

        console.log('currentImage is: ' + currentImage);


        var bgImg = new Image();


        $(bgImg).load(function(){
          console.log('iamges is loaded');
          $griderlyOverlay.removeClass('loading');
          setBgImage(currentIndex);
          
          

        }).attr('src',currentImage);

        

       


});

});

return this;

};
}( jQuery ));

