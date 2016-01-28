(function () {

    angular.module('myApp')
        .directive("dynamicComponents", function (componentConfiguration) {
            return {
                //template: [
                //    '<div ui-view="componentA"></div>',
                //    '<div ui-view="componentB"></div>'
                //].join(''),

                //compile: function (elem, attr) {
                //    var items = componentConfiguration.components[attr.components] && componentConfiguration.components[attr.components].items;
                //
                //    if (items) {
                //        var elements = componentConfiguration.components[attr.components].items.map(function (item) {
                //            return '<div ui-view="' + item.type + '"></div>'
                //        }).join('');
                //
                //        elem.html(elements);
                //    }
                //}
                compile: function (elem, attr) {
                    var items = componentConfiguration.components[attr.components] && componentConfiguration.components[attr.components].items;

                    if (items) {
                        var elements = [];
                        var makeElementsHtml = function (componentItems) {
                            angular.forEach(componentItems, function (componentItem) {
                                elements.push("<div class='row'>");
                                if (componentItem.type) {
                                    //elements.push('<div ui-view="' + componentItem.type + "_" + componentItem.randomView + '"></div>');
                                    elements.push('<ui-View-Wrapper view="' + componentItem.type + '" random-View="' + componentItem.randomView + '"></ui-View-Wrapper>');
                                } else if (componentItem.items) {
                                    elements.push('<div class="col-md-1 ' + componentItem.layout + '">');
                                    makeElementsHtml(componentItem.items);
                                    elements.push('</div>');
                                }
                                elements.push("</div>");
                            });
                        };
                        makeElementsHtml(items, elements);


                        elem.html(elements.join(''));
                    }
                }
            }
        })

}());