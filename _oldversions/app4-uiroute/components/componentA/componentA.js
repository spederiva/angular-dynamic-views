(function () {

    var ctrl = function ($rootScope) {
        this.rootScope = $rootScope;
    };
    ctrl.prototype.now = new Date();

    ctrl.prototype.buttonClick = function () {
        this.rootScope.$broadcast('componentA.buttonClick', {now: new Date()});
        //
        //this.rootScope.$broadcast('subscription1.componentA.buttonClick', {now: new Date()});
        //
        //this.rootScope.$broadcast('subscription2.componentA.buttonClick', {now: new Date()});
    };

    ctrl.prototype.doOnClick = function(){
        this.rootScope.$broadcast('componentA.buttonClick', {now: new Date()});
    }

    angular.module('example.componentA', []).controller("componentAController", ['$rootScope', ctrl]);

}());