(function () {
    var Controller = function WelcomeController(componentConfiguration, $timeout, $state, pubsub, $scope) {
        var self = this;

        this.componentToRender = $state.current.name;

        this.heading = 'Welcome to The New Angular Router Demo!';

        //$timeout(function () {
        //    componentConfiguration.components.welcome.items.push({"type": "componentC"})
        //
        //    pubsub.publish('changeJSON');
        //
        //}, 1000);

        pubsub.subscribe("componentA.dosomething", function(){
            console.log('%csetInterval', 'background-color:red', $scope.$id);
        }, $scope);

        $scope.$on("componentA.dosomething", function(){
            console.log('%csetInterval $on', 'background-color:violet', $scope.$id);
        });
    };
    Controller.prototype.doSomething = function () {
        alert(222);
    }

    //Controller.$routeConfig = [
    //    {
    //        path: '/',
    //        component: {
    //            left: 'componenta'
    //        }
    //    }
    //];

    //Controller.prototype.canDeactivate = function () {
    //    console.log("+Home canDeactivate triggered");
    //    return true;
    //};
    //
    //Controller.prototype.deactivate = function () {
    //    console.log("+Home deactivate triggered");
    //};
    //
    //Controller.prototype.canActivate = function () {
    //    console.log("+Home canActivate triggered");
    //    return true;
    //};
    //
    //Controller.prototype.activate = function () {
    //    console.log("+Home activate triggered");
    //};

    angular.module('example.welcome', []).controller('WelcomeController',
        ['componentConfiguration', '$timeout', '$state', 'pubsub', '$scope', Controller]);
}());