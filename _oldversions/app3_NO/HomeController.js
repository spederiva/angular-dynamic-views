(function() {
    'use strict';

    /**
     * Home Controller
     */
    angular
        .module('myapp.home')
        .controller('HomeController', Controller);

    function Controller() {
        console.log("Home controller instantiated");
        var vm = this;
        vm.name = "Plunker";
    }

    Controller.prototype.canDeactivate = function() {
        console.log("+Home canDeactivate triggered");
        return true;
    };

    Controller.prototype.deactivate = function() {
        console.log("+Home deactivate triggered");
    };

    Controller.prototype.canActivate = function() {
        console.log("+Home canActivate triggered");
        return true;
    };

    Controller.prototype.activate = function() {
        console.log("+Home activate triggered");
    };



})();