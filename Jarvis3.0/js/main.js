function toTop() {
    $("body").animate({scrollTop: 0}, 1000);
}

$(window).scroll(function() {
    if ($("body").scrollTop() > 100) {
        $('.backToTop').fadeIn();
    } else {
        $('.backToTop').fadeOut();
    }
});