//  https://developers.getbase.com/docs/rest/reference/deals

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('deals', params, callback);
    },
    create: function(data, callback) {
        return this.upsert(null, data, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('deals/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('deals/' + id, callback);
    },
    upsert: function(params, data, callback) {
        return this.request.post('deals', data, params, callback);
    }
};

module.exports = Service;