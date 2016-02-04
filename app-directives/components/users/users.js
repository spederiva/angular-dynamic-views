(function () {
    var ctrl = function ($rootScope, pubsub) {
        this.rootScope = $rootScope;
        this.pubsub = pubsub;

        this.options = {
            data: [
                {id: 1, name: "Yael"},
                {id: 2, name: "Shir"},
                {id: 3, name: "Itamar"},
                {id: 4, name: "Sebastian"}
            ]
        }
    };

    angular.module('example.users', [])
        .controller("usersController", ['$rootScope', 'pubsub', ctrl])
        .directive('users', function () {
            return {
                templateUrl: 'components/users/users.html',
                controller: 'usersController',
                controllerAs: 'users'
            }
        });
}());