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

            $scope.$on('$destroy', function(){
                console.log("$destroyed");
            })

        };

        // publish data changed notification
        var publish = function (eventName) {
            $rootScope.$broadcast(eventName);
        };

        // publish data changed notification
        var subscribeEvents = function (instance, subscribes, $scope) {
            var subs;
            if (!$scope || !$scope.$on) {
                throw ("No $scope is defined!...");
            }

            subs = JSON.parse(subscribes);

            for (var sub in subs) {
                if (typeof instance[subs[sub]] === 'function') {
                    subscribe(sub, instance[subs[sub]].bind(instance), $scope);
                }
            }

            console.log('Events subscribed', subscribes);
        }


        // return the publicly accessible methods
        return {
            subscribe: subscribe,
            publish: publish,
            subscribeEvents: subscribeEvents
        };
    }]);