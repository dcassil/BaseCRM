//  https://developers.getbase.com/docs/rest/reference/tags

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('tags', params, Model);
    },
    create: function(data) {
        return this.request.post('tags', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('tags/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('tags/' + id);
    }
};

module.exports = Service;