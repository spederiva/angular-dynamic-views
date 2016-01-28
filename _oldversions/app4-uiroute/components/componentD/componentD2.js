(function () {
    window.controllers = window.controllers || {};


    window.controllers.componentD = function ($rootScope, $timeout) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;

        //window.controllers.componentB.apply(this, arguments); // call super constructor.

        //console.log('window.controllers.componentD');
        //
        //var self = this;
        //
        //this.rootScope = $rootScope;
        //
        ////console.log(this.registerEvents)
        //this.registerEvents(this.rootScope);
        //
        ////console.log(this.XXX);

        this._constructor_();
    };
    window.controllers.componentD.prototype = Object.create(window.controllers.componentB.prototype);
    //window.controllers.componentD.prototype.constructor = window.controllers.componentB;

    window.controllers.componentD.prototype.registerEvents = function (rootScope) {
        var self = this;

        //this.$rootScope.$on('componentA.buttonClick', function (scope, obj) {
        //    self.now = obj.now;
        //
        //    console.log('componentA.buttonClick')
        //});

        //alert(this.registerEvents)

    }

    angular.module('example.componentD', []).controller("componentDController", ['$rootScope', '$timeout', window.controllers.componentD]);

}());
