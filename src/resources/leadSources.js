//  https://developers.getbase.com/docs/rest/reference/lead_sources

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('lead_sources', params, Model);
    },
    create: function(data) {
        return this.request.post('lead_sources', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('lead_sources/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('lead_sources/' + id);
    }
};


module.exports = Service;