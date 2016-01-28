(function() {
    'use strict';

    /**
     * Header Controller
     */
    angular
        .module('myapp')
        .controller('HeaderController', Controller);

    Controller.$inject = [
        '$location'
    ];

    function Controller($location) {
        var vm = this;
        vm.isActive = isActive;

        function isActive(route){
            return ($location.path().indexOf(route)!=-1);
        }
    }

})();