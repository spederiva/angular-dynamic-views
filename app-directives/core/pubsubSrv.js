angular.module('myApp').service('pubsub', function() {
    var subscribers = [];

    this.subscribe = function(eventName, instanceId, callback) {
        subscribers.push({
            eventName, instanceId, callback
        });
    };

    this.publish = function(eventName, instanceId, data) {
        var filteredSubscribers = subscribers.filter(function(subscriber) {
            //return subscriber.eventName === eventName && subscriber.instanceId === instanceId;
            return subscriber.eventName === eventName;
        });

        if(filteredSubscribers.length > 0) {
            filteredSubscribers.forEach(function(subs){
                subs.callback(data);
            })

        }
    };

    this.subscribeEvents = function(instance, subscribes){
        var subs = JSON.parse(subscribes);

        for (var sub in subs) {
            if (typeof instance[subs[sub]] === 'function') {
                instance.pubsub.subscribe(sub, -1, instance[subs[sub]].bind(instance));
            }
        }

        console.log('Events subscribed for ComponentB');
    }
});