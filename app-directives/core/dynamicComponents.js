(function () {
    angular.module('myApp')
        .directive("dynamicComponents", function ($compile, componentConfiguration) {
            var components = {};

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
                                if (!componentItem.componentUniqueId) {
                                    var random = Math.round(Math.random() * 10000000),
                                        componentInstance = componentItem.type + random.toString();
                                } else {
                                    componentInstance = componentItem.componentUniqueId;
                                }

                                if (componentItem.type) {
                                    scope.subscribes[componentInstance] = componentItem.subscribes;
                                }

                                elements.push("<div class='row'>");
                                if (componentItem.type) {
                                    if (!components[componentInstance]) {
                                        var directiveHtml = '<' + componentItem.type + ' subscribes="{{subscribes.' + componentInstance + '}}"></' + componentItem.type + '>';
                                        components[componentInstance] = $compile(directiveHtml)(scope);

                                        componentItem.componentUniqueId = componentInstance;
                                    }

                                    elements.push(components[componentInstance]);
                                } else if (componentItem.items) {
                                    elements.push('<div class="col-md-1 ' + componentItem.layout + '">');
                                    makeElementsHtml(componentItem.items);
                                    elements.push('</div>');
                                }
                                elements.push("</div>");
                            });
                        };

                        makeElementsHtml(scopeComponents, elements);

                        //var components = $compile(elements.join(''))(scope);
                        console.log(components);
                        console.log(elements);

                        elem.html(elements);
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