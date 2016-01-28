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

        this.$timeout(function () {
            self.now = new Date();
        }, 500);

        this.registerEvents(this.rootScope);
    };

    Controller.prototype.registerEvents = function (rootScope) {
        var self = this,
            eventObj = this.eventSubscriptions && this.eventSubscriptions['componentA.buttonClick'];

        if (eventObj) {
            this.pubsub.subscribe('componentA.buttonClick', -1, function (obj) {
                self.now = obj.now;

                console.log('componentA.buttonClick');
            });
        }

        console.log('Events subscribed for ComponentB');
    };
    Controller.prototype.XXX = function () {
        alert(111)
    };

    angular.module('example.componentB', []).controller("componentBController", ['$scope', '$timeout', 'pubsub', '$state', Controller]);

}());