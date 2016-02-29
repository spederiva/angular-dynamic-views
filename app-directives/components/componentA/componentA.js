(function () {


    var ctrl = function ($rootScope, pubsub) {
        this.rootScope = $rootScope;
        this.pubsub = pubsub;

        console.log('AAAA');

        this.now = new Date();

    };

    ctrl.prototype.buttonClick = function () {
        //this.pubsub.publish('componentA.buttonClick', 1, {now: new Date()});
        this.pubsub.publish('componentA.buttonClick', null, {now: new Date()});


    };

    angular.module('example.componentA', [])
        .controller("componentAController", ['$rootScope', 'pubsub', ctrl])
        .directive('componenta', function () {
            return {
                templateUrl: 'components/componentA/componentA.html',
                controller: 'componentAController',
                controllerAs: 'componenta'
            }
        });


    return "example.componentA";
}());