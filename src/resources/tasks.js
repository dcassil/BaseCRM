//  https://developers.getbase.com/docs/rest/reference/tasks

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('tasks', params);
    },
    create: function(data) {
        return this.request.post('tasks', data);
    },
    update: function(id, data) {
        return this.request.put('tasks/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('tasks/' + id);
    }
};

module.exports = Service;