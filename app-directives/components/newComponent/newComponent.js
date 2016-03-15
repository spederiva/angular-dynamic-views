/**
 * Created by sebastianp on 14/03/2016.
 */

(function () {
    class Ctrl extends BaseCtrl {
        constructor($scope, pubsub, $log) {
            super($scope, pubsub);

            //this.rootScope = $rootScope;
            //this.pubsub = pubsub;

            $log.log('newComponent');

            this.now = new Date();
        }

        buttonClick() {
            //this.pubsub.publish('componentA.buttonClick', 1, {now: new Date()});
            //this.pubsub.publish('componentA.buttonClick', null, {now: new Date()});

            this.now = new Date();

            console.log(this.pubsub);
        }

        updateNow(evt, nothing, newdate){
            this.now = newdate.now;
        }
    }

    angular.module('example.newComponent', [])
        .controller("newComponentController", ['$scope', 'pubsub', '$log', Ctrl])
        .component('newcomponent', {
                templateUrl: 'components/newcomponent/newcomponent.html',
                controller: 'newComponentController',
                bindings: {
                    subscribes: '&',
                    hero: '='
                }
            }
        );

    return "example.newcomponent";
}());
