(function () {
    var Controller = function WelcomeController( componentConfiguration,$timeout) {
        var self = this;

        this.heading = 'Welcome to The New Angular Router Demo!';

        this.components = componentConfiguration.components.welcome.items;

        $timeout(function(){
            self.components.push({"type": "componentC"})
        }, 3000);
    };

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
        ['componentConfiguration','$timeout',Controller]);
}());