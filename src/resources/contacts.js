//  https://developers.getbase.com/docs/rest/reference/contacts

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,
    
    find: function(params) {
        return this.request.get('contacts', params, Model);
    },
    create: function(data) {
        return this.request.post('contacts', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('contacts/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('contacts/' + id);
    },
    upsert: function(params, data) {
        return this.request.post('contacts', data, params, Model);
    }
};

module.exports = Service;