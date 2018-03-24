(function($) {
    $WIN = $(window);

   /* Preloader
    * ----------------------------------------------------- */
    var clPreloader = function() {
        
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(200).fadeOut("slow");
            }); 
  
        });
    };
	var SmoothOpacity = function() {
		    $(document).ready(function(){ 
			$('.main_news').mouseout(function(){ 
				$('.gek').stop().animate({opacity:'0.35'},600); 
			}); 
			$('.main_news').mouseover(function(){ 
				$('.gek').stop().animate({opacity:'0.7'},300); 
			}); 
			$('.imgcol').mouseout(function(){ 
				$(this).stop().animate({opacity:'1'},600); 
			}); 
			$('.imgcol').mouseover(function(){ 
				$(this).stop().animate({opacity:'0.35'},300); 
			}); 		
		});
	};
   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
		SmoothOpacity();
        clPreloader();
    })();
        
})(jQuery);