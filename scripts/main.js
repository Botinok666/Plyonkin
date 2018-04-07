(function($) {
    $WIN = $(window);

   /* Preloader
    * ----------------------------------------------------- */
    var clPreloader = function() {
        
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