(function () {
    var ctrl = function ($scope, $rootScope, pubsub) {
        this.rootScope = $rootScope;
        this.pubsub = pubsub;

        console.log('AAAA');

        $scope.$on('$destroy', function(){
            alert(new Date());
        })

        this.now = new Date();

        //setInterval(function(){
        //    console.log('%csetInterval', 'background-color:yellow');
        //}, 200)



    };

    ctrl.prototype.buttonClick = function () {
       console.log('%cbuttonClick', 'color:blue');

        //this.pubsub.publish('componentA.buttonClick', 1, {now: new Date()});
        this.pubsub.publish('componentA.buttonClick', null, {now: new Date()});

        //setInterval(function(){
        //    this.pubsub.publish('componentA.dosomething');
        //
        //    console.log('%csetInterval', 'background-color:yellow');
        //}.bind(this), 1000);

    };

    angular.module('example.componentA', [])
        .controller("componentAController", ['$scope', '$rootScope', 'pubsub', ctrl])
        .directive('componenta', function () {
            return {
                templateUrl: 'components/componentA/componentA.html',
                controller: 'componentAController',
                controllerAs: 'componenta'
            }
        });
}());