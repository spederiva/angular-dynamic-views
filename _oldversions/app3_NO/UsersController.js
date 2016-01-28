(function() {
    'use strict';

    /**
     * Users Controller
     */
    angular
        .module('myapp.users')
        .controller('UsersController', Controller);

    Controller.$inject = [
        'UsersService'
    ];

    Controller.$routeConfig = [
        { path: '/:id', component: 'details' }
    ];

    function Controller(UsersService) {
        console.log("Users controller instantiated");
        var vm = this;
        vm.list = UsersService.get();
    }

    Controller.prototype.canDeactivate = function() {
        console.log("+Users canDeactivate triggered");
        return true;
    };

    Controller.prototype.deactivate = function() {
        console.log("+Users deactivate triggered");
    };

    Controller.prototype.canActivate = function() {
        console.log("+Users canActivate triggered");
        return true;
    };

    Controller.prototype.activate = function() {
        console.log("+Users activate triggered");
    };

})();