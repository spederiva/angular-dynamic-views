'use strict';

window.routeComponents = {};

$.get('routing_new2.json')
    .done(function (data) {
        window.routeComponents = data;

        angular.element(document).ready(function () {
            angular.bootstrap(document, ['myApp']);
        });
    });

angular.module('myApp', [
        'ui.router',

        'app.directives.componentButton',

        'example.flickr',
        'example.settings',
        'example.welcome',
        'example.about',

        'example.componentA',
        'example.componentB',
        'example.componentC',

    ])
    .config(['$stateProvider', '$urlRouterProvider', 'componentConfigurationProvider', function ($stateProvider, $urlRouterProvider, componentConfigurationProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/welcome");

        componentConfigurationProvider.makeRouting();

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
        $httpProvider.interceptors.push('myInterceptor');
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

    //.provider("componentConfiguration", ['$stateProvider', function ($stateProvider) {
    //    var initInjector = angular.injector(['ng']);
    //    var $http = initInjector.get('$http');
    //    var routeComponents = window.routeComponents;
    //
    //    this.makeRouting = function () {
    //        angular.forEach(routeComponents, function (item, prop) {
    //            if (!item.views) {
    //                $stateProvider.state(prop, {
    //                    templateUrl: item.templateUrl,
    //                    controller: item.controller,
    //                    abstract: true
    //                });
    //            } else {
    //                var
    //                    viewsObj = {},
    //                    views = angular.forEach(item.views, function (item) {
    //                        viewsObj[item] = {};
    //                        viewsObj[item].templateUrl = "components/" + item + "/" + item + ".html";
    //                        viewsObj[item].controller = item + "Controller as " + item.toLowerCase();
    //
    //                    });
    //
    //                $stateProvider.state(prop, {
    //                    url: item.url,
    //                    views: viewsObj
    //                });
    //
    //            }
    //        });
    //    };
    //
    //    this.$get = function () {
    //        return {
    //            components: routeComponents
    //        }
    //    }
    //}])
    .provider("componentConfiguration", ['$stateProvider', function ($stateProvider) {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get('$http');
        var routeComponents = window.routeComponents;

        this.makeRouting = function () {
            angular.forEach(routeComponents, function (item, prop) {
                $stateProvider.state(prop, {
                    templateUrl: item.templateUrl,
                    controller: item.controller,
                    abstract: true
                });

                var componentRoutes = {};
                var makeComponentRoutes = function (componentItems) {
                    angular.forEach(componentItems, function (componentItem) {
                        if (componentItem.type) {
                            var
                                random = Math.round(Math.random() * 10000000),
                                view = componentRoutes[componentItem.type + "_" + random] = {};

                            componentItem.randomView = random;

                            if (!componentItem.inherit) {
                                view.controller = componentItem.type + "Controller as " + componentItem.type.toLowerCase();
                                view.templateUrl = "components/" + componentItem.type + "/" + componentItem.type + ".html";
                                view.data = componentItem.subscribes;
                            } else {
                                view.controller = componentItem.type + "Controller as " + componentItem.inherit.toLowerCase();
                                view.templateUrl = "components/" + componentItem.inherit + "/" + componentItem.inherit + ".html";
                                view.data = componentItem.subscribes;
                            }
                        } else if (componentItem.items) {
                            makeComponentRoutes(componentItem.items);
                        }
                    });
                };
                makeComponentRoutes(item.items);

                $stateProvider.state(prop + ".components", {
                    url: "/" + prop,
                    views: componentRoutes,
                    data: "components"
                });

            });
        };

        this.$get = function () {
            return {
                components: routeComponents
            }
        }
    }])

;