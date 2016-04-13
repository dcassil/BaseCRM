//  https://developers.getbase.com/docs/rest/reference/leads

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('leads', params, Model);
    },
    create: function(data) {
        return this.request.post('leads', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('leads/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('leads/' + id);
    },
    upsert: function(params, data) {
        return this.request.post('leads', data, params, Model);
    }
};

module.exports = Service;