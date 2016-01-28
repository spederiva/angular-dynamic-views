(function () {
    var ctrl = function () {

    };
    ctrl.prototype.now = new Date();

    //angular.module('example.componentC', []).controller("componentCController", [ctrl]);
    angular.module('example.componentC', [])
        .controller("componentCController", [function () {

        }]);

}());