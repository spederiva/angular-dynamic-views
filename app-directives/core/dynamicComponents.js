(function () {

    angular.module('myApp')
        .directive("dynamicComponents", function ($compile, componentConfiguration) {
            return {
                scope: {
                    components: '='
                },
                //compile: function (elem, attr) {
                //    var items = componentConfiguration.components[attr.components] && componentConfiguration.components[attr.components].items;
                //
                //    if (items) {
                //        var elements = [];
                //        var makeElementsHtml = function (componentItems) {
                //            angular.forEach(componentItems, function (componentItem) {
                //                elements.push("<div class='row'>");
                //                if (componentItem.type) {
                //                    //elements.push('<div ui-view="' + componentItem.type + "_" + componentItem.randomView + '"></div>');
                //                    elements.push('<ui-View-Wrapper view="' + componentItem.type + '" random-View="' + componentItem.randomView + '"></ui-View-Wrapper>');
                //                } else if (componentItem.items) {
                //                    elements.push('<div class="col-md-1 ' + componentItem.layout + '">');
                //                    makeElementsHtml(componentItem.items);
                //                    elements.push('</div>');
                //                }
                //                elements.push("</div>");
                //            });
                //        };
                //        makeElementsHtml(items, elements);
                //
                //
                //        elem.html(elements.join(''));
                //    }
                //}

                link: function (scope, elem, attr) {
                    scope.subscribes = {

                    };

                    var renderComponents = function(scopeComponents) {
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

                    scope.$watch("components", function(newValue){
                        console.log("Rendering Tiles", newValue);

                        renderComponents(newValue);
                    }, true);
                }
            }
        })

}());