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

                return {
                    scope: {
                        components: '@'
                    },
                    link: function (scope, elem, attr) {
                        scope.subscribes = {};
                        
                        pubsub.subscribe("changeJSON", function (evt, changedJson) {
                            if (elem.attr("nodeId") === changedJson.id) {
                                layoutBuilder(scope, elem, changedJson);
                            }
                        });

                        if (componentConfiguration.components[scope.components])
                            layoutBuilder(scope, elem, componentConfiguration.components[scope.components]);
                        else {
                            //var items = findNode(elem.parents("[nodeid]").attr("nodeid"), componentConfiguration.components);
                            var items = componentConfiguration.components["welcome"].items[1];

                            layoutBuilder(scope, elem, items);
                        }
                    }
                }
            })

    }()
);