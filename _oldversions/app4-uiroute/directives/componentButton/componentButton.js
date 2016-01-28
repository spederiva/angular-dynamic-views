(function () {

    angular.module('app.directives.componentButton', []).directive('componentButton', function () {
        return {
            scope: {
                onClick: '&'
            },

            templateUrl: './directives/componentButton/view.html',

            controller: function ($scope) {
                this.buttonClick = function () {
                    $scope.onClick();
                }
            },
            controllerAs: 'componentButton'
        }
    })

}());