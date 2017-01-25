Template.Home_Carousel.onCreated(function() {
    var template = this;
    template.currentIndex = 0;
    template.totalSlides = 0;

    template.ajustCarouselHeight = function() {
        var carouselHeight = 0;

        var allSlides = template.$('[data-carousel] > [data-carousel-slide]');

        template.$('[data-carousel] > [data-carousel-slide]').each(function(index) {
            var slideHeight = $(this).height();
            if (slideHeight > carouselHeight) carouselHeight = slideHeight;
        });

        template.totalSlides = allSlides.length;

        $('[data-carousel]').height(carouselHeight);
    };

    template.gotoSlide = function(slideIndex) {
        var currentSlide = $('[data-carousel] .pu-home-carousel__slide--is-active');
        var currentImage = $('[data-carousel] .pu-home-carousel__image--is-active');
        var currentDot = $('[data-carousel] .pu-home-carousel__navigation__dot--is-active');

        currentSlide.removeClass('pu-home-carousel__slide--is-active');
        currentImage.removeClass('pu-home-carousel__image--is-active');
        currentDot.removeClass('pu-home-carousel__navigation__dot--is-active');

        var allSlides = template.$('[data-carousel] > [data-carousel-slide]');

        template.totalSlides = allSlides.length;

        allSlides.each(function(index) {
            if (index < slideIndex) {
                $(this).removeClass('pu-home-carousel__slide--right');
                $(this).addClass('pu-home-carousel__slide--left');
            } else if (index > slideIndex) {
                $(this).removeClass('pu-home-carousel__slide--left');
                $(this).addClass('pu-home-carousel__slide--right');
            } else {
                $(this).removeClass('pu-home-carousel__slide--left');
                $(this).removeClass('pu-home-carousel__slide--right');
                $(this).addClass('pu-home-carousel__slide--is-active');
            }
        });

        $(template.$('[data-carousel] > [data-carousel-slide-image]')[slideIndex]).addClass('pu-home-carousel__image--is-active');
        $(template.$('[data-carousel-navigation] > [data-carousel-dot]')[slideIndex]).addClass('pu-home-carousel__navigation__dot--is-active');

        template.currentIndex = slideIndex;
    };
});

Template.Home_Carousel.onRendered(function() {
    var template = this;
    template.ajustCarouselHeight();
    $(window).on('resize', template.ajustCarouselHeight);
});

Template.Home_Carousel.onDestroyed(function() {
    var template = this;
    $(window).off('resize', template.ajustCarouselHeight);
});

Template.Home_Carousel.events({
    'click [data-carousel-dot]': function(event, template) {
        event.preventDefault();
        var slideIndex = parseInt($(event.currentTarget).data('carousel-dot'));
        template.gotoSlide(slideIndex);
    },
    'click [data-carousel-arrow-left]': function(event, template) {
        event.preventDefault();
        if (template.currentIndex) template.gotoSlide(template.currentIndex - 1);
    },
    'click [data-carousel-arrow-right]': function(event, template) {
        event.preventDefault();
        if (template.currentIndex !== (template.totalSlides - 1)) template.gotoSlide(template.currentIndex + 1);
    }
});
