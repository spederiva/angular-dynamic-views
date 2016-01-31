'use strict';

window.routeComponents = {};

//$.get('routing.json')
//    .done(function (data) {
//        window.routeComponents = data;
//
//        angular.element(document).ready(function () {
//            angular.bootstrap(document, ['myApp']);
//        });
//    });
//
angular.module('myApp', [
        'ui.router'
    ])
    .config(function (routerStateProvider, $urlRouterProvider, $stateProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/welcome");

        //Now set up the states
        routerStateProvider.setRouting();


        //$stateProvider.decorator('views', function (state, parent) {
        //    var result = {},
        //        views = parent(state);
        //
        //    angular.forEach(views, function (config, name) {
        //        var autoName = (state.name + '.' + name).replace('.', '/');
        //        config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
        //        result[name] = config;
        //    });
        //    return result;
        //});
    })
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                console.log(event, toState, toParams, fromState, fromParams)

                if (window.isNewWelcome) {
                    // transitionTo() promise will be rejected with
                    // a 'transition prevented' error
                    window.isNewWelcome = false;

                    //$state.reload('welcome.components')
                    //$state.reload('welcome.components2')

                    $state.go('welcome.admin2');

                    event.preventDefault();
                }
            })
    })
    .provider("routerState", function ($stateProvider) {
        var stateProvider = $stateProvider;

        this.setRouting = function () {
            $stateProvider
            //.state('welcome', {
            //    url: "/welcome",
            //    templateUrl: "components/welcome.html",
            //    //controller: 'WelcomeController as welcome',
            //    //abstract: true
            //})
            //
                .state('welcome', {
                    //url: "/welcome",
                    templateUrl: "components/welcome.html",
                    controller: 'WelcomeController as welcome',
                    abstract: true
                })
                .state('welcome.admin', {
                    url: "/welcome/admin",
                    views: {
                        "componentA": {
                            templateUrl: "components/componentA.html",
                            controller: function () {
                                console.log('Org ComponentA');
                            }
                        },
                        "componentB": {
                            templateUrl: "components/componentB.html"
                        }
                    },
                    data: {}
                })
                .state('welcome.simpleuser', {
                    url: "/welcome/simpleuser",
                    views: {
                        "componentA": {
                            templateUrl: "components/componentA.simpleuser.html",
                            controller: function () {
                                console.log('Org ComponentA')
                            }
                        },
                        "componentB": {
                            templateUrl: "components/componentB.simpleuser.html"
                        }
                    },
                    data: {}
                })
                .state('about', {
                    url: "/about",
                    templateUrl: "components/about.html"
                });
        };

        this.$get = function () {
            return {
                $stateProvider: stateProvider

            }
        };
    })
    .controller("AppController", function ($scope, $state, routerState, $view, $urlRouter) {

        $scope.changeRouting = function () {
            var comp = $state.get('welcome.components');

            //comp.views['componentC'] = {
            //    templateUrl: "components/componentC.html"
            //}
            //
            //$state.reload('welcome.components');
            //routerState.$stateProvider.state('test', {
            //    url: "/test",
            //    templateUrl: "components/test.html"
            //})

            //routerState.$stateProvider.state('welcome', {
            //    url: "/welcome",
            //    templateUrl: "components/test.html"
            //})
            window.isNewWelcome = true;

            routerState.$stateProvider.state('welcome.admin2', {
                url: "/welcome/admin2",
                views: {
                    "componentA": {
                        templateUrl: "components/componentA.html"
                    },
                    "componentB": {
                        templateUrl: "components/componentB.html"
                    },
                    "componentC": {
                        templateUrl: "components/componentC.html",
                        controller: function () {
                            alert(111)
                        }
                    }
                },
                data: {}
            });
            //
            //$state.go("welcome.components2")

            //$view.load('welcome.components', {
            //    views: {
            //        "componentA": {
            //            templateUrl: "components/componentA.html"
            //        },
            //        "componentB": {
            //            templateUrl: "components/componentB.html"
            //        },
            //        "componentC": {
            //            templateUrl: "components/componentC.html"
            //        }
            //    }
            //})

            //$view.load("componentA@welcome", {
            //    view: "components/componentC.html"
            //})

            //var state = $state.get('welcome.components');
            //state.url = '/oldWelcome';
            ////if(state && state.views && state.views['sub@root']){
            //state.views.componentA.template = '<h1>componentA</h1>';
            //state.views.componentA.controller = function(){
            //    alert(999)
            //};
            //state.views.componentC = {
            //    template: '<h1 style="background-color: #d43f3a">componentC</h1>'
            //};
            //}

            $urlRouter.sync();
            $urlRouter.listen();
        }
    })
    .controller("WelcomeController", function ($state) {
        var comp = $state.get('welcome.component');


    })


;