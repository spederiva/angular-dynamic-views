/**
 * Created by sebastianp on 15/03/2016.
 */

(function () {
    angular.module('myApp').factory("layoutBuilder", function ($compile, $log, componentRenderer) {
        var
            makeElementsHtml = function (scope, componentItems, elements) {
                angular.forEach(componentItems, function (componentItem) {
                    var compRendered;

                    elements.push("<div class='row'>");
                    if (componentItem.type) {
                        compRendered = componentRenderer(scope, componentItem);

                        //Add subscriptions to Scope
                        scope.subscribes[compRendered.id] = componentItem.subscribes;

                        elements.push(compRendered.compiledComponents);
                    } else if (componentItem.items) {
                        elements.push('<div class="col-md-1 ' + componentItem.layout + '">');
                        makeElementsHtml(scope, componentItem.items, elements);
                        elements.push('</div>');
                    }
                    elements.push("</div>");
                });
            },

            layoutBuilder = function (scope, scopeComponents) {
                if (scopeComponents.items) {
                    var elements = [];

                    makeElementsHtml(scope, scopeComponents.items, elements);

                    $log.log("Elements", elements);

                    return elements;
                }
            };

        return layoutBuilder;
    })
}());

