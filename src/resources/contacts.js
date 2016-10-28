//  https://developers.getbase.com/docs/rest/reference/contacts

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('contacts', params, callback);
    },
    create: function(data, callback) {
        return this.upsert(null, data, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('contacts/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('contacts/' + id, callback);
    },
    upsert: function(params, data, callback) {
        return this.request.post('contacts', data, params, callback);
    }
};

module.exports = Service;