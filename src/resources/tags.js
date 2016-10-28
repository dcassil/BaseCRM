//  https://developers.getbase.com/docs/rest/reference/tags

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('tags', params, callback);
    },
    create: function(data, callback) {
        return this.request.post('tags', data, null, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('tags/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('tags/' + id, callback);
    }
};

module.exports = Service;