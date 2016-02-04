(function () {
    angular.module('myApp')
        .directive("dynamicComponents", function ($compile, componentConfiguration) {
            return {
                scope: {
                    components: '@'
                },
                link: function (scope, elem, attr) {
                    scope.subscribes = {};

                    var renderComponents = function (scopeComponents) {
                        var elements = [];
                        var makeElementsHtml = function (componentItems) {
                            angular.forEach(componentItems, function (componentItem) {
                                if (componentItem.subscribes) {
                                    var random = Math.round(Math.random() * 10000000),
                                        componentInstance = componentItem.type + random.toString();

                                    scope.subscribes[componentInstance] = componentItem.subscribes;
                                }

                                elements.push("<div class='row'>");
                                if (componentItem.type) {
                                    elements.push('<' + componentItem.type + ' subscribes="{{subscribes.' + componentInstance + '}}"></' + componentItem.type + '>');
                                } else if (componentItem.items) {
                                    elements.push('<div class="col-md-1 ' + componentItem.layout + '">');
                                    makeElementsHtml(componentItem.items);
                                    elements.push('</div>');
                                }
                                elements.push("</div>");
                            });
                        };

                        makeElementsHtml(scopeComponents, elements);

                        var components = $compile(elements.join(''))(scope);

                        elem.html(components);
                    }

                    var components = componentConfiguration.components[scope.components] && componentConfiguration.components[scope.components].items;

                    scope.$watch(
                        function () {
                            return components;
                        },
                        function (newValue) {
                            console.log("Rendering Tiles", newValue);

                            renderComponents(components);
                        },
                        true);
                }
            }
        })

}());