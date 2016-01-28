(function () {

    angular.module('myApp').directive("uiViewWrapper", function ($compile) {
        var stateRouter;
        return {
            scope: {
                view: '@',
                randomView: '@'
            },
            //compile: function (elem, attr) {
            //    var type, randomView, uiview;
            //
            //    type = attr.view;
            //    randomView = attr.randomview;
            //    uiview = '<div>type: {{type}}</div><div ui-view="' + type + "_" + randomView + '"></div>';
            //
            //    elem.append(uiview);
            //
            //    return function (scope) {
            //        var currentView = type + "_" + randomView;
            //        //var viewData = scope.viewData[currentView];
            //
            //        scope.type = type;
            //        scope.viewSubscriptions = scope.viewData[currentView].data;
            //        //scope.viewData2 = type;
            //
            //        //console.log(scope)
            //    }
            //},
            link: function (scope, elem, attr) {
                var html = '<div>type: {{view}}</div><div ui-view="{{view}}_{{randomView}}"></div>';

                var component = $compile(html)(scope);
                elem.append(component);

                //Add to Scope
                var currentView = scope.view + "_" + scope.randomView;

                scope.viewSubscriptions = scope.viewData[currentView].data;
            },
            controller: function ($scope, $state) {
                $scope.viewData = $state.current.views;
            }
        }
    });


}())