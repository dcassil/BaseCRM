function Service(request) {
    this.request = request;
}

Service.prototype = {
    start: function(deviceUUID) {
        return this.request.post('sync/start', null, null, {
            'X-Basecrm-Device-UUID': deviceUUID
        }).then(function(data) {
            if(data) {
                data.queues = data.queues.map(function(item) {
                    return item.data;
                });
            }
            return data;
        });
    },
    fetch: function(deviceUUID, sessionId) {
        return this.request.send({
            method: 'GET',
            resource: 'sync/' + sessionId + '/queues/main',
            headers: {
                'X-Basecrm-Device-UUID': deviceUUID
            }
        }).then(function(res) {
            return res && res.items;
        });
    },
    ack: function(deviceUUID, ackKeys) {
        return this.request.post('sync/ack', {
            ack_keys: ackKeys
        }, null, {
            'X-Basecrm-Device-UUID': deviceUUID
        });
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

    if(!this.sessionId) {
        this.service.start(this.deviceUUID)
            .then(function(data) {
                if(data) {
                    this.sessionId = data.id;
                    return this.fetch(handler);
                }
            }.bind(this));
        return;
    }

    this.service.fetch(this.deviceUUID, this.sessionId)
        .then(function(items) {
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

            return this.service.ack(this.deviceUUID, ackKeys);
        }.bind(this))
        .then(function(isBroken) {
            isBroken === false || this.fetch(handler);
        }.bind(this));
};

Sync.Service = Service;

Sync.ACK = true;
Sync.NACK = false;

module.exports = Sync;