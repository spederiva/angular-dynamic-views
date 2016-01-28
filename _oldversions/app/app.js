'use strict';

angular.module('myApp', [
        'ngNewRouter',

        'example.flickr',
        'example.settings',
        'example.welcome',
        'example.about',

        'example.componentA',
        'example.componentB',
        'example.componentC'
    ])
    .controller('AppController', ['$router', function AppController($router) {
        $router.config([
            {path: '/', redirectTo: '/welcome'},
            {path: '/welcome', component: 'welcome'},
            {path: '/flickr', component: 'flickr'},
            {path: '/settings', component: 'settings'},
            {path: '/about', component: 'about'}
        ]);
    }]);