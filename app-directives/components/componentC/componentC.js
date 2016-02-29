(function () {
    var ctrl = function () {
        this.now = new Date();

        this.handleOnClick = function () {
            console.log(this.now);

            this.now = new Date();
        }.bind(this);
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