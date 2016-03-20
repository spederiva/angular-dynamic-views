(function () {
        var findNode = function (id, currentNode) {
            var item;

            if (currentNode.id == id) {
                return currentNode;
            }

            for (var propName in currentNode) {
                if (currentNode.hasOwnProperty(propName)) {
                    item = currentNode[propName];

                    if (propName === "id" && id == item) {
                        return currentNode;
                    } else if (typeof item === "object") {
                        return findNode(id, item);
                    }
                }


            }

            return undefined;
        }

        angular.module('myApp')
            .directive("dynamicComponents", function ($compile, componentConfiguration, pubsub, layoutBuilder) {
                var addLayoutToDom = function (scope, elem, items) {
                    var jqElem = layoutBuilder(scope, items);

                    //Add nodeId to identify the component
                    elem.attr("nodeId", items.id);

                    //Add to the DOM
                    elem.append(jqElem);
                }

                return {
                    scope: {
                        components: '@'
                    },
                    link: function (scope, elem, attr) {
                        scope.subscribes = {};

                        pubsub.subscribe("changeJSON", function (evt, changedJson) {
                            if (elem.attr("nodeId") === changedJson.id) {
                                addLayoutToDom(scope, elem, changedJson);
                            }
                        });

                        if (componentConfiguration.components[scope.components])
                            addLayoutToDom(scope, elem, componentConfiguration.components[scope.components]);
                        else {
                            //var items = findNode(elem.parents("[nodeid]").attr("nodeid"), componentConfiguration.components);
                            var items = componentConfiguration.components["welcome"].items[1];

                            addLayoutToDom(scope, elem, items);
                        }
                    }
                }
            })

    }()
);