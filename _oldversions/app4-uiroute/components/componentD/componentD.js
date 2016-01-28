(function () {
    window.controllers = window.controllers || {};

    //window.controllers.componentD = angular.copy(window.controllers.componentB);
    window.controllers.componentD = window.controllers.componentB.clone();

    window.controllers.componentD.prototype.registerEvents = function (rootScope) {
        var self = this;

        console.log('No Events subscribed for ComponentD');
    }

    angular.module('example.componentD', []).controller("componentDController", ['$rootScope', '$timeout', window.controllers.componentD]);
}());