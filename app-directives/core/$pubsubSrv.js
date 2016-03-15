/**
 * Created by sebastianp on 14/03/2016.
 */

angular.module('myApp')
    // define the request notification channel for the pub/sub service
    .factory('pubsub', ['$rootScope', function ($rootScope) {
        //subscribe to edit data notification
        var subscribe = function (eventName, handler, $scope) {
            if (!$scope || !$scope.$on) {
                console.log("No $scope is defined!...Using $rootScope");

                $scope = $rootScope;
            }

            var evt = $scope.$on(eventName, handler);
        };

        // publish data changed notification
        var publish = function (eventName) {
            $rootScope.$broadcast.apply($rootScope, arguments);
        };

        // publish data changed notification
        var subscribeEvents = function (instance, subscribes, $scope) {
            var subs;
            if (!$scope || !$scope.$on) {
                throw ("No $scope is defined!...");
            }

            if (typeof subscribes === "object") {
                for (var sub in subscribes) {
                    if (typeof instance[subscribes[sub]] === 'function') {
                        subscribe(sub, instance[subscribes[sub]].bind(instance), $scope);
                    }
                }

                console.log('Events subscribed', subscribes);

            }
        }


        // return the publicly accessible methods
        return {
            subscribe: subscribe,
            publish: publish,
            subscribeEvents: subscribeEvents
        };
    }]);