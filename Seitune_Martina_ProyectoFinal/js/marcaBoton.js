$(function(){
    $('li').removeClass('active');
    $('.navbar-nav > li:nth-child(1)').addClass('active');
});
$(window).on("scroll", function(){
	var distancia = $(document).scrollTop();
	var mitadVentana = $(window).height()/2;
    var anclas = $('[data-ancla = true]');
    for(var i=0; i< anclas.length; i++){
        actual = $(anclas[i]).attr('href');
        if(distancia >= $(actual).offset().top - mitadVentana){
            $('.navbar-nav > li').removeClass('active');
            $(anclas[i]).parent().addClass('active');
        }
    }
});