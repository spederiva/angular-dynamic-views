/**
 * Created by sebastianp on 14/03/2016.
 */

(function () {
    var ctrl = function ($rootScope, pubsub, $log) {
        this.rootScope = $rootScope;
        this.pubsub = pubsub;

        $log.log('newComponent');

        this.now = new Date();

    };

    ctrl.prototype.buttonClick = function () {
        //this.pubsub.publish('componentA.buttonClick', 1, {now: new Date()});
        //this.pubsub.publish('componentA.buttonClick', null, {now: new Date()});

        this.now = new Date();
    };

    angular.module('example.newComponent', [])
        .controller("newComponentController", ['$rootScope', 'pubsub', '$log', ctrl])
        .component('newcomponent', {
                templateUrl: 'components/newcomponent/newcomponent.html',
                controller: 'newComponentController',
                bindings: {
                    hero: '='
                }
            }
        );

    return "example.newcomponent";
}());
