/**
 * Created by sebastianp on 15/03/2016.
 */

(function () {
    angular.module('myApp')
        .factory("componentRenderer", function ($compile, componentConfiguration, pubsub) {
            var
                compiledComponents = {},

                componentRenderer = function (scope, componentItem) {
                    var
                        directiveHtml = "",
                        id = componentItem.id || Math.round(Math.random() * 10000000),
                        componentInstance = componentItem.type + id.toString();

                    if (!compiledComponents[componentInstance]) {

                        directiveHtml = '<' + componentItem.type +
                            ' subscribes="subscribes.' + componentInstance + '"' +
                            ' nodeid="' + componentItem.id + '">' +
                            '</' + componentItem.type + '>';

                        compiledComponents[componentInstance] = $compile(directiveHtml)(scope.$new());

                        componentItem.componentUniqueId = componentInstance;
                    }
                    //else{
                    //    console.log(compiledComponents[componentInstance]);
                    //
                    //    //compiledComponents[componentInstance] = "<div>xxxx</div>";
                    //}

                    return {
                        id: componentInstance,
                        compiledComponents: compiledComponents[componentInstance]
                    };
                }

            return componentRenderer;

        })
}());

