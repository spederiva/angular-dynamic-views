(function () {
    var Controller = function ($scope, $timeout, pubsub, $state) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.pubsub = pubsub;
        this.$state = $state;
        this.eventSubscriptions = $scope.$parent.viewSubscriptions;

        //console.log($scope.$parent.viewData);
        //console.log("xxxxx", $scope.$parent.viewSubscriptions);


        this._constructor_();
    };
    Controller.prototype._constructor_ = function () {
        console.log('window.controllers.componentB');

        var self = this;
        this.bgcolor = "#00b3ee";

        this.$timeout(function () {
            self.now = new Date();
        }, 500);

        this.registerEvents(this.rootScope);
    };

    Controller.prototype.registerEvents = function (rootScope) {
        var self = this,
            eventObj = this.eventSubscriptions && this.eventSubscriptions['componentA.buttonClick'],
            eventObjFunc = eventObj && typeof this[this.eventSubscriptions['componentA.buttonClick']] === 'function' && this[this.eventSubscriptions['componentA.buttonClick']];

        if (eventObj && eventObjFunc) {
            //this.pubsub.subscribe('componentA.buttonClick', -1, function (obj) {
            //    //self.now = obj.now;
            //    //
            //    //console.log('componentA.buttonClick');
            //
            //
            //    eventObjFunc();
            //
            //});
            this.pubsub.subscribe('componentA.buttonClick', -1, eventObjFunc.bind(self));
        }

        console.log('Events subscribed for ComponentB');
    };
    Controller.prototype.XXX = function () {
        alert(111)
    };
    Controller.prototype.updateNow = function (obj) {
        var self = this;

        this.$scope.$applyAsync(function () {
            self.now = obj.now;
            self.bgcolor = "#" + ((1 << 24) * Math.random() | 0).toString(16);

            console.log('componentA.buttonClick');
        });

    };
    Controller.prototype.updateNow2 = function (obj) {
        var self = this;

        this.$scope.$applyAsync(function () {
            self.now = 1 - obj.now;
            self.bgcolor = '#' + Math.random().toString(16).substr(-6);

            console.log('componentA.buttonClick');
        });
    };

    //ctrl.prototype.now = new Date();

    angular.module('example.componentB', []).controller("componentBController", ['$scope', '$timeout', 'pubsub', '$state', Controller]);

}());