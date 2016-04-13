//  https://developers.getbase.com/docs/rest/reference/tasks

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('tasks', params, Model);
    },
    create: function(data) {
        return this.request.post('tasks', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('tasks/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('tasks/' + id);
    }
};

module.exports = Service;