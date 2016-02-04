(function () {

    angular.module('example.componentB', [])
        .directive('componentb', function () {
            return {
                scope: {
                    subscribes: '@'
                },
                templateUrl: 'components/componentB/componentB.html',
                controller: 'componentBController',
                controllerAs: 'componentb'
            }
        });

}());