(function () {
    angular.module('myApp')
        .directive("dynamicComponents", function ($compile, componentConfiguration, pubsub) {
            var compiledComponents = {};

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
                                    if (!compiledComponents[componentInstance]) {
                                        var directiveHtml = '<' + componentItem.type + ' subscribes="{{subscribes.' + componentInstance + '}}"></' + componentItem.type + '>';
                                        compiledComponents[componentInstance] = $compile(directiveHtml)(scope);

                                        componentItem.componentUniqueId = componentInstance;
                                    }
                                    //else{
                                    //    console.log(compiledComponents[componentInstance]);
                                    //
                                    //    //compiledComponents[componentInstance] = "<div>xxxx</div>";
                                    //}

                                    elements.push(compiledComponents[componentInstance]);
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
                        console.log(compiledComponents);
                        console.log(elements);

                        elem.html(elements);
                    }

                    //scope.$watch(
                    //    function () {
                    //        return componentConfiguration.components[scope.components] && componentConfiguration.components[scope.components].items;
                    //    },
                    //    function (newValue, oldValue) {
                    //        console.log("Rendering Tiles", newValue, oldValue);
                    //
                    //        renderComponents(newValue);
                    //    },
                    //    true);

                    pubsub.subscribe("changeJSON", function(){
                        renderComponents(componentConfiguration.components[scope.components] && componentConfiguration.components[scope.components].items);
                    });

                    renderComponents(componentConfiguration.components[scope.components] && componentConfiguration.components[scope.components].items);
                }
            }
        })

}());