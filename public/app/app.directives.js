angular.module('angular-simple-sidebar', [])
    .directive('angularSimpleSidebar', function ($rootScope, $log, $location) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                items: '=',
                state: '=',
                title: '=',
                settings: '=',
                styles: '=',
                expand: '='
            },

            templateUrl: 'tpl/sidebar.html',
            link: function (scope, element, attrs) {
                scope.slide;

                if (scope.state) {
                    scope.slide = 'in';
                }

                scope.openSidebar = function (event) {
                    scope.state = true;
                    scope.slide = 'in';
                    $log.debug(event)
                }

                scope.closeSidebar = function () {
                    scope.state = false;
                    scope.slide = 'out';
                }

                scope.expandThis = function () {
                    scope.expand = !scope.expand;
                }

                scope.toggleSidebar = function (func) {
                    $rootScope.$emit("broaded", {"data": "something"});
                    func();
                }
            }
        };
    });


