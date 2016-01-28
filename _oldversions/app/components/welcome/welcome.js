(function () {
    var Controller = function WelcomeController($router) {
        this.heading = 'Welcome to The New Angular Router Demo!';
    };

    Controller.$routeConfig = [
        {
            path: '/',
            component: {
                left: 'componenta'
            }
        }
    ];

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
        [Controller]);
}());