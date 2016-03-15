'use strict';

window.routeComponents = {};

$.get('routing.json')
    .done(function (data) {
        window.routeComponents = data;

        angular.element(document).ready(function () {
            angular.bootstrap(document, ['myApp']);
        });
    });

var myAppModuleDependencies = [
    'ui.router',
    'ui.grid',

    'app.directives.componentButton',

    'example.flickr',
    'example.settings',
    'example.welcome',
    'example.about',

    'example.componentA',
    'example.componentB',
    'example.componentC',
    'example.newComponent',

    'example.users'
]

angular.module('myApp', myAppModuleDependencies)
    .config(['$stateProvider', '$urlRouterProvider', 'componentConfigurationProvider', function ($stateProvider, $urlRouterProvider, componentConfigurationProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/welcome");

        componentConfigurationProvider.makeRouting();

        $stateProvider
            .state('about', {
                url: "/about",
                templateUrl: "components/about/about.html",
                //controller: 'WelcomeController as welcome'
            })

        // Now set up the states
        //$stateProvider
        //    .state('welcome', {
        //        //url: "/welcome",
        //        templateUrl: "components/welcome/welcome.html",
        //        controller: 'WelcomeController as welcome',
        //        abstract: true
        //    })
        //    .state('welcome.components', {
        //        url: "/welcome",
        //        views: {
        //            "componentA": {
        //                templateUrl: "components/componentA/componentA.html",
        //                controller: 'WelcomeController as welcome',
        //                  data: {}
        //            },
        //            "componentB_1": {
        //                templateUrl: "components/componentB/componentB.html",
        //                controller: 'ComponentBController as welcome',
        //                  data: "doOnClick"
        //            },
        //            "componentB_2": {
        //                templateUrl: "components/componentB/componentB.html",
        //                controller: 'ComponentBController as welcome',
        //                  data: "doNothing"
        //            }
        //        },
        //          data: {}
        //    })

        //$router.config([
        //    {path: '/', redirectTo: '/welcome'},
        //    {path: '/welcome', component: 'welcome'},
        //    {path: '/flickr', component: 'flickr'},
        //    {path: '/settings', component: 'settings'},
        //    {path: '/about', component: 'about'}
        //]);
    }])

    .config(function ($httpProvider) {
        //$httpProvider.interceptors.push('myInterceptor');
    })

    .factory('myInterceptor', [function () {
        var sessionInjector = {
            //request: function (config) {
            //    config.headers['x-session-token'] = "token";
            //
            //    return config;
            //},
            response: function (response) {
                if (response.config.headers.Accept === "text/html") {
                    var html = response.data;

                    if (html.indexOf("<dynamic-components></dynamic-components>") > -1) {
                        var fn = response.config.url.match(/([^/])+/g);
                        fn = fn[fn.length - 1]; // get the last element of the array
                        var componentName = fn.substring(0, fn.indexOf('.'));

                        response.data = html.replace("<dynamic-components></dynamic-components>",
                            "<dynamic-components components=\"" + componentName + "\"></dynamic-components>")
                    }

                }
                return response;
            }
        };
        return sessionInjector;
    }])

    .controller('AppController', [function AppController() {

    }])

    .provider("componentConfiguration", ['$stateProvider', function ($stateProvider) {
        var routeComponents = window.routeComponents;

        this.makeRouting = function () {
            angular.forEach(routeComponents, function (item, prop) {
                if(item.templateUrl && item.controller) {
                    $stateProvider.state(prop, {
                        url: "/" + prop,
                        templateUrl: item.templateUrl,
                        controller: item.controller
                    });
                }
            });
        };

        this.$get = function () {
            return {
                components: routeComponents
            }
        }
    }]);