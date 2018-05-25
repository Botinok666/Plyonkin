(function($) {
    $WIN = $(window);

   /* Preloader
    * ----------------------------------------------------- */
    var clPreloader = function() {
        		$(document).ready(function() {   
			$('#modal').click(function(e) {
			e.preventDefault();
			var id = $(this).attr('href');
			var maskHeight = $(document).height();
			var maskWidth = $(window).width();
			$('#mask').css({'width':maskWidth,'height':maskHeight});
			$('#mask').fadeIn(900); 
			$('#mask').fadeTo("slow",0.7); 
			var winH = $(window).height();
			var winW = $(window).width();
			$(id).css('top',  winH/2-$(id).height()/2);
			$(id).css('left', winW/2-$(id).width()/2);
			$(id).fadeIn(1800); 
			});
			$('.window .close1').click(function (e) { 
			e.preventDefault();
			$('#mask, .window').hide();
			}); 
			$('#mask').click(function () {
			$(this).hide();
			$('.window').hide();
			}); 
		   });  
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {
            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(200).fadeOut("slow");
            }); 
  
        });
    };

   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
		
        clPreloader();
    })();
        
})(jQuery);