/**
 * Created by sebastianp on 14/03/2016.
 */

(function () {
    var
        subscribeAllComponentEvents = function ($scope, pubsub) {
            //The instance (this) is not initialized only after the constructor is finished, so timeout was added
            setTimeout(function () {
                pubsub.subscribeEvents(this, this.subscribes, $scope);
            }.bind(this), 0);
        }

    class BaseCtrl {

        constructor($scope, pubsub) {
            if (!$scope || !$scope.$on) {
                throw "No '$scope' sent to 'BaseCtrl'";
            }
            if (!pubsub) {
                throw "No 'pubsub' sent to 'BaseCtrl'";
            }

            this.pubsub = pubsub;

            subscribeAllComponentEvents.call(this, $scope, pubsub);
        }

    }

    window.BaseCtrl = BaseCtrl;
}());