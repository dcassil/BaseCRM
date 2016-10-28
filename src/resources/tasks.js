//  https://developers.getbase.com/docs/rest/reference/tasks

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('tasks', params, callback);
    },
    create: function(data, callback) {
        return this.request.post('tasks', data, null, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('tasks/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('tasks/' + id, callback);
    }
};

module.exports = Service;