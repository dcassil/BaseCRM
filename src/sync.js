//  https://developers.getbase.com/docs/rest/reference/sync

function Sync(client, deviceUUID) {
    this.client = client;
    this.deviceUUID = deviceUUID;
}

Sync.prototype.request = function(options) {
    if(!options.headers) {
        options.headers = {};
    }

    options.headers['X-Basecrm-Device-UUID'] = this.deviceUUID;

    return this.crm.request(options);
};


//  https://developers.getbase.com/docs/rest/articles/sync/requests

Sync.prototype.start = function() {
    return this.request({
        method: 'POST',
        resource: 'sync/start'
    });
};
Sync.prototype.fetch = function(sessionId) {
    return this.request({
        method: 'GET',
        resource: 'sync/' + sessionId + '/queues/main'
    });
};
Sync.prototype.ack = function(ackKeys) {
    return this.request({
        method: 'POST',
        resource: 'sync/ack',
        data: {
            data: {
                ack_keys: ackKeys
            }
        }
    });
};


Sync.prototype.check = function(handler) {
    if(!(handler instanceof Function)) {
        return;
    }

    if(!this.sessionId) {
        this.start()
            .then(function(res) {
                this.sessionId = res.data.id;
                return this.check(handler);
            }.bind(this));
        return;
    }

    this.fetch(this.sessionId)
        .then(function(res) {
            if(!(res.items instanceof Array)) {
                return;
            }

            var ackKeys = res.items
                .filter(function(item) {
                    return handler.call(item, item.meta.type, item.meta.sync.event_type, item.data) !== false;
                })
                .map(function(item) {
                    return item.meta.sync.ack_key;
                });

            if(!ackKeys.length) {
                return;
            }

            this.ack(ackKeys)
                .then(function() {
                    this.check(handler);
                }.bind(this));
        }.bind(this));
};


module.exports = Sync;