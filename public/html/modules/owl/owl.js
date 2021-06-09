'use strict';

app.directive('ngOwl', ['$location', function ($location) {
    return {
        restrict: 'C',
        scope: {
            items: '=items',
            images: '=images',
            autoplay: '=autoplay',
            scroll: '=scroll',
            type: '=type',
            out: '=out',
            name: '=name'
        },
        templateUrl: 'modules/owl/owl.html',
        link: function (scope, element, attrs) {
            scope.apiPrefix = apiPrefix;
            scope.loading = false;
            scope.setFalse = function () {
                setTimeout(function () {
                    scope.loading = false;
                }, 1000)
            };
            scope.renderFinish = function () {
                var owl = $(element).find('.owl-carousel')
                owl.owlCarousel({
                    navigation: false,  // Show next and prev buttons
                    slideSpeed: 300,
                    loop: true,
                    paginationSpeed: 400,
                    singleItem: true,
                    autoplay: !!scope.autoplay,
                    autoplayTimeout: 3000,
                    lazyLoad: true,
                    autoplayHoverPause: true,
                    items: scope.items ? scope.items : 1,
                    dots: true,
                    mouseDrag: false
                });
                if (scope.scroll) {
                    var owl2 = $(scope.name).find('.owl-carousel');
                    owl2.on('mousewheel', '.owl-stage', function (e) {
                        if (scope.loading) {
                            return false;
                        }
                        scope.loading = true;
                        scope.setFalse();
                        if (e.originalEvent.deltaY > 0) {
                            owl2.trigger('next.owl');

                        } else {
                            owl2.trigger('prev.owl');
                        }
                        e.preventDefault();
                    });
                }

            };
        }
    };
}]);
