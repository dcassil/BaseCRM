//  https://developers.getbase.com/docs/rest/reference/leads

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('leads', params, callback);
    },
    create: function(data, callback) {
        return this.upsert(null, data, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('leads/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('leads/' + id, callback);
    },
    upsert: function(params, data, callback) {
        return this.request.post('leads', data, params, callback);
    }
};

module.exports = Service;