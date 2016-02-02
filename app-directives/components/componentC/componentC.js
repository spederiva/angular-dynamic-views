(function () {
    var ctrl = function () {
        this.now = new Date();
    };

    angular.module('example.componentC', [])
        .controller("componentCController", [ctrl])
        .directive('componentc', function () {
            return {
                templateUrl: 'components/componentC/componentC.html',
                controller: 'componentCController',
                controllerAs: 'componentc'
            }
        });


}());