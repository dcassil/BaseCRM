//  https://developers.getbase.com/docs/rest/reference/notes

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('notes', params, callback);
    },
    create: function(data, callback) {
        return this.request.post('notes', data, null, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('notes/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('notes/' + id, callback);
    }
};

module.exports = Service;