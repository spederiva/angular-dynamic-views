(function() {
    'use strict';

    /**
     * Users Service
     */
    angular
        .module('myapp')
        .factory('UsersService', Service);

    Service.$inject = [
        '$filter'
    ];

    function Service($filter){
        var users = [{
            id: 34,
            username: 'batman',
            roles: ['admin', 'user']
        }, {
            id: 67,
            username: 'spiderman',
            roles: ['user']
        }];

        var get = function() {
            return users;
        }

        var getById = function(id) {
            if(!id) return {};
            return $filter('filter')(users, {id:id}, true)[0] || {};
        }

        return {
            get: get,
            getById: getById
        }
    }

})();