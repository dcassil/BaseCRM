//  https://developers.getbase.com/docs/rest/reference/loss_reasons

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('loss_reasons', params, callback);
    },
    create: function(data, callback) {
        return this.request.post('loss_reasons', data, null, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('loss_reasons/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('loss_reasons/' + id, callback);
    }
};

module.exports = Service;