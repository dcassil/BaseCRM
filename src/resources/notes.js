//  https://developers.getbase.com/docs/rest/reference/notes

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('notes', params, Model);
    },
    create: function(data) {
        return this.request.post('notes', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('notes/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('notes/' + id);
    }
};

module.exports = Service;