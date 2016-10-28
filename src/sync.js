function Service(request) {
    this.request = request;
}

Service.prototype = {
    start: function(deviceUUID, callback) {
        return this.request
            .headers({
                'X-Basecrm-Device-UUID': deviceUUID
            })
            .post('sync/start', function(data) {
                if(data) {
                    data.queues = data.queues.map(function(item) {
                        return item.data;
                    });
                }
                return data;
            })
            .then(callback);
    },
    fetch: function(deviceUUID, sessionId, callback) {
        return this.request.send({
            method: 'GET',
            resource: 'sync/' + sessionId + '/queues/main',
            headers: {
                'X-Basecrm-Device-UUID': deviceUUID
            }
        }, function(res) {
            return res && res.items;
        })
            .then(callback);
    },
    ack: function(deviceUUID, ackKeys, callback) {
        return this.request
            .headers({
                'X-Basecrm-Device-UUID': deviceUUID
            })
            .post('sync/ack', {
                ack_keys: ackKeys
            })
            .then(callback);
    }
};


function Sync(client, deviceUUID) {
    this.service = new Service(client.request);
    this.deviceUUID = deviceUUID;
}

Sync.prototype.fetch = function(handler) {
    if(!(handler instanceof Function)) {
        return;
    }
    
    var self = this;

    if(!self.sessionId) {
        self.service.start(this.deviceUUID, function(data) {
            if(data) {
                self.sessionId = data.id;
                return self.fetch(handler);
            }
        });
        return;
    }

    self.service.fetch(self.deviceUUID, self.sessionId, function(items) {
        if(!(items instanceof Array)) {
            return false;
        }

        var ackKeys = items
            .filter(function(item) {
                return handler.call(item, item.meta.type, item.meta.sync.event_type, item.data);
            })
            .map(function(item) {
                return item.meta.sync.ack_key;
            });

        if(!ackKeys.length) {
            return false;
        }

        return self.service.ack(self.deviceUUID, ackKeys, function(isBroken) {
            isBroken === false || self.fetch(handler);
        });
    });
};

Sync.Service = Service;

Sync.ACK = true;
Sync.NACK = false;

module.exports = Sync;