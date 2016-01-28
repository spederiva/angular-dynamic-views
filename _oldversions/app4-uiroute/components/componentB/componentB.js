(function () {
    window.controllers = window.controllers || {};

    window.controllers.componentB = function ($rootScope, $timeout) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;

        this._constructor_();
    };
    window.controllers.componentB.prototype._constructor_ = function(){
        console.log('window.controllers.componentB');

        var self = this;

        //this.rootScope = $rootScope;

        this.$timeout(function () {
            self.now = new Date();
        }, 500);


        //this.rootScope.$on('subscription1.componentA.buttonClick', function (scope, obj) {
        //    self.now = obj.now;
        //});

//        eventSrv.makeSubcriptions();

        this.doOnButton = function () {

        }

        this.registerEvents(this.rootScope);
    }
    window.controllers.componentB.prototype.registerEvents = function (rootScope) {
        var self = this;

        this.$rootScope.$on('componentA.buttonClick', function (scope, obj) {
            self.now = obj.now;

            console.log('componentA.buttonClick');
        });

        console.log('Events subscribed for ComponentB');
    }
    window.controllers.componentB.prototype.XXX = function(){
        alert(111)
    }

    //ctrl.prototype.now = new Date();

    angular.module('example.componentB', []).controller("componentBController", ['$rootScope', '$timeout', window.controllers.componentB]);

}());