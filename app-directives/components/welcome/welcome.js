(function () {
    var Controller = function WelcomeController(componentConfiguration, $timeout, $state) {
        var self = this;

        this.componentToRender = $state.current.name;

        this.heading = 'Welcome to The New Angular Router Demo!';

        $timeout(function () {
            componentConfiguration.components.welcome.items.push({"type": "componentC"})
        }, 3000);
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
        ['componentConfiguration', '$timeout', '$state', Controller]);
}());