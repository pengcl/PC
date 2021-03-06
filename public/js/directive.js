'use strict';

/* Filters */
var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('repeatFinish', function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                scope.$eval(attr.repeatFinish);
            }
        }
    }
});

appDirectives.directive('lightbox', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            lightbox: '=',
            index: '='
        },
        link: function (scope, element, attrs) {
            // Ensure input is array
            if (scope.index >= 0) {
                var arr = [];
                for (var i = 0; i < scope.lightbox.length; i++) {
                    var j = i + scope.index >= scope.lightbox.length ? i + scope.index - scope.lightbox.length : i + scope.index;
                    arr.push(scope.lightbox[j])
                }
                scope.images = arr;
            } else {
                if (angular.isArray(scope.lightbox)) {
                    scope.images = scope.lightbox;
                } else {
                    scope.images = [scope.lightbox];
                }
            }


            // Wait for child elements before performing querySelectorAll
            $timeout(function () {
                $.each(element[0].querySelectorAll('.lightbox-trigger'), function (i, trigger) {
                    trigger.addEventListener('click', function (event) {
                        event.preventDefault();
                        // If ctrl key or middle button pressed
                        if (event.ctrlKey || event.which == 2) {
                            // Open image in new tab
                            window.open(this.href, '_blank');
                        } else {
                            scope.buildLightbox(this);
                        }
                    });
                });
            });

            /**
             * Build lightbox element, insert under body and attach event listeners
             */
            scope.buildLightbox = function (clickedElement) {
                // Build DOM
                var dom = angular.element(
                    '<div class="angular-lightbox-overlay" style="display: none">' +
                    '<span class="angular-lightbox-inner">' +
                    '<a href class="previous" title="?????????">&#8249;</a>' +
                    '<img src="">' +
                    '<a href class="next" title="?????????">&#8250;</a>' +
                    '<a href class="close" title="??????">&times;</a>' +
                    '</span>' +
                    '</div>'
                )[0];
                scope.dom = dom;
                document.body.appendChild(dom);
                scope.image = dom.querySelector('img');

                // Hide navigation buttons for single image
                if (scope.images.length === 1) {
                    dom.classList.add('single-image');
                }

                // Find image matching clicked link
                var index = scope.images.indexOf(clickedElement.getAttribute('href'));

                // Fallback to first image
                if (index == -1) {
                    index = 0;
                }
                scope.loadImageAt(index);

                document.addEventListener('keydown', scope.onKeyDown);

                // Previous image button
                dom.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (e.target.classList.contains('previous')) {
                        scope.showPrevious();
                    } else if (e.target.classList.contains('next')) {
                        scope.showNext();
                    } else if (e.target.classList.contains('close')
                        || e.target.classList.contains('angular-lightbox-overlay')) {
                        // Click on close or empty space
                        scope.closeLightbox();
                    }
                });
            };

            /**
             * Remove lightbox from document, clean-up event listeners
             */
            scope.closeLightbox = function () {
                document.removeEventListener('keydown', scope.onKeyDown);
                scope.dom.parentNode.removeChild(scope.dom);
            };

            /**
             * Callback for keydown event: Handle keyboard navigation
             */
            scope.onKeyDown = function (event) {
                switch (event.which) {
                    case 37: // Left arrow
                        scope.showPrevious();
                        break;
                    case 39: // Right arow
                        scope.showNext();
                        break;
                    case 36: // Home
                        scope.loadImageAt(0);
                        break;
                    case 35: // End
                        scope.loadImageAt(scope.images.length - 1);
                        break;
                    case 27: // Escape
                        scope.closeLightbox();
                        break;
                }
            };

            /**
             * Load image at given index
             */
            scope.loadImageAt = function (index) {
                scope.path = scope.images[index];
                var img = new Image();
                var inner = scope.dom.querySelector('.angular-lightbox-inner');
                img.onload = function () {
                    inner.replaceChild(this, scope.image);
                    scope.image = this;
                    scope.dom.style.display = 'flex';
                }
                img.onerror = function () {
                    inner.replaceChild(this, scope.image);
                    scope.image = this;
                    scope.dom.style.display = 'flex';
                };
                img.title = (index + 1) + '/' + scope.images.length;
                img.src = scope.path; // Trigger image loading
                img.alt = scope.path;
            }

            /**
             * Display previous image in scope.images
             */
            scope.showPrevious = function () {
                var index = scope.images.indexOf(scope.path) - 1;
                scope.loadImageAt(index == -1 ? scope.images.length - 1 : index);
            };

            /**
             * Display next image in scope.images
             */
            scope.showNext = function () {
                var index = scope.images.indexOf(scope.path) + 1;
                scope.loadImageAt(index == scope.images.length ? 0 : index);
            };
        }
    };
}]);

